import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, and, sql } from "drizzle-orm";
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Total files count (not in trash)
    const totalFilesResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(files)
      .where(and(eq(files.userId, userId), eq(files.isTrash, false)));

    const totalFiles = totalFilesResult[0]?.count || 0;

    // Total storage used (sum of sizes, not in trash)
    const storageResult = await db
      .select({ totalSize: sql<number>`sum(${files.size})` })
      .from(files)
      .where(and(eq(files.userId, userId), eq(files.isTrash, false)));

    const totalSize = storageResult[0]?.totalSize || 0;

    // For shared files, assuming no share table, set to 0 for now
    const sharedFiles = 0;

    // Format storage size
    const formatSize = (bytes: number) => {
      if (bytes === 0) return '0 B';
      const k = 1024;
      const sizes = ['B', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    };

    return NextResponse.json({
      totalFiles,
      storageUsed: formatSize(totalSize),
      sharedFiles,
    });
  } catch (err) {
    console.error("Error fetching stats:", err);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
