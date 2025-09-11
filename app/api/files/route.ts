import {db} from "@/lib/db";
import {files} from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, and, isNull } from "drizzle-orm";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req:NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
    const searchParams = req.nextUrl.searchParams;
    const queryUserId = searchParams.get('userId');
    const parentId = searchParams.get('parentId') || null;

    if (!queryUserId && queryUserId !== userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch files from database based on parentId
    let userFiles;
    if (parentId) {
      // Fetch files within a specific folder
      userFiles = await db
        .select()
        .from(files)
        .where(and(eq(files.userId, userId), eq(files.parentId, parentId)));
    } else {
      // Fetch root-level files (where parentId is null)
      userFiles = await db
        .select()
        .from(files)
        .where(and(eq(files.userId, userId), isNull(files.parentId)));
    }

    return NextResponse.json(userFiles);
    }
    catch (err) {
        console.error("Error fetching files:", err);
    return NextResponse.json(
      { error: "Failed to fetch files" },
      { status: 500 }
    );
  
    }
}