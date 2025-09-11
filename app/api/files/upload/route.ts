import { db } from "@/lib/db";
import {files} from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, and } from "drizzle-orm";
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from "uuid";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!
});

export async function POST(req:NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        //parse from data
        const formdata = await req.formData();
        const file = formdata.get("file") as File;
        const parentId = formdata.get("parentId") as string || null;
        const formUserId = formdata.get("userId") as string;

        if(formUserId !== userId){
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if(!file){
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }
        if(parentId){
            const [parent] = await db.select().from(files).where(and(
                eq(files.id, parentId),
                eq(files.userId, userId),
                eq(files.isFolder, true))
            )
            if(!parent){
                return NextResponse.json({ error: "Parent folder not found" }, { status: 404 });
            }
        }

       // Only allow image uploads
    if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only image files are supported" },
        { status: 400 }
      );
    }

    const buffer = await file.arrayBuffer();
    const filebuffer = Buffer.from(buffer);

    const originalFilename = file.name;
    const fileExtension = originalFilename.split(".").pop() || "";
    const uniqueFilename = `${uuidv4()}.${fileExtension}`;

    // Create folder path based on parent folder if exists
    const folderPath = parentId
      ? `/droply/${userId}/folders/${parentId}`
      : `/droply/${userId}`;

    const uploadResponse = await imagekit.upload({
      file: filebuffer,
      fileName: uniqueFilename,
      folder: folderPath,
      useUniqueFileName: false,
    });

    const fileData = {
      name: originalFilename,
      path: uploadResponse.filePath,
      size: file.size,
      type: file.type,
      fileUrl: uploadResponse.url,
      thumbnailUrl: uploadResponse.thumbnailUrl || null,
      userId: userId,
      parentId: parentId,
      isFolder: false,
      isStarred: false,
      isTrash: false,
    };

    const [newFile] = await db.insert(files).values(fileData).returning();

    return NextResponse.json(newFile);

    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
    }
}