import { NextRequest, NextResponse } from "next/server";
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { shares, files } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import bcrypt from 'bcrypt';

export async function POST(
  request: NextRequest,
  { params }: { params: { fileId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { fileId } = params;
    const body = await request.json();
    const { password, expiry, viewOnce } = body;

    // Validate file exists and belongs to user
    const file = await db
      .select()
      .from(files)
      .where(eq(files.id, fileId))
      .limit(1);

    if (!file.length || file[0].userId !== userId) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    // Generate unique share ID
    const shareId = randomUUID();

    // Hash password if provided
    let passwordHash = null;
    if (password) {
      passwordHash = await bcrypt.hash(password, 10);
    }

    // Calculate expiry if provided
    let expiryDate: Date | null = null;
    if (expiry) {
      expiryDate = new Date(Date.now() + expiry * 1000); // expiry in seconds
    }

    // Create share record
    await db.insert(shares).values({
      id: shareId,
      fileId,
      userId,
      passwordHash,
      expiresAt: expiryDate,
      viewOnce: viewOnce || false,
      viewCount: 0,
    });

    const shareLink = `${process.env.NEXT_PUBLIC_APP_URL}/share/${shareId}`;

    return NextResponse.json({ shareLink });
  } catch (error) {
    console.error('Error creating share link:', error);
    // Return error message for debugging
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 });
  }
}
