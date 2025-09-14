import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export async function PATCH(
  request: NextRequest,
  props: { params: Promise<{ fileId: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { fileId } = await props.params;
    if (!fileId) {
      return NextResponse.json(
        { error: "File ID is required" },
        { status: 400 }
      );
    }

    // Get the current file
    const [file] = await db
      .select()
      .from(files)
      .where(and(eq(files.id, fileId), eq(files.userId, userId)));

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Toggle the isTrash status (move to trash or restore)
    const [updatedFile] = await db
      .update(files)  // Step 1: Choose the table (files) to update
      .set({ isTrash: !file.isTrash })   // Step 2: Flip the value of isTrash
      .where(and(eq(files.id, fileId), eq(files.userId, userId)))   // Step 3: Only update the file that belongs to this user
      .returning();    // Step 4: Return the updated row (the changed file)

    //"moved to trash" if file was trashed.
//"restored" if file was un-trashed.
    const action = updatedFile.isTrash ? "moved to trash" : "restored";
    return NextResponse.json({
      ...updatedFile,
      message: `File ${action} successfully`,
    });
    
  } catch (error) {
    console.error("Error updating trash status:", error);
    return NextResponse.json(
      { error: "Failed to update file trash status" },
      { status: 500 }
    );
  }
}