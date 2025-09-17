import { NextRequest, NextResponse } from "next/server";
import { db } from '@/lib/db';
import { shares, files } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { password } = body;

    // Find share link
    const share = await db
      .select()
      .from(shares)
      .where(eq(shares.id, id))
      .limit(1);

    if (!share.length) {
      return NextResponse.json({ error: 'Link does not exist' }, { status: 404 });
    }

    const shareRecord = share[0];

    // Check expiry
    if (shareRecord.expiresAt && new Date() > new Date(shareRecord.expiresAt)) {
      return NextResponse.json({ error: 'Link expired' }, { status: 403 });
    }

    // Check view-once
    if (shareRecord.viewOnce && shareRecord.viewCount >= 1) {
      return NextResponse.json({ error: 'Link already viewed' }, { status: 403 });
    }

    // Check password if set
    if (shareRecord.passwordHash) {
      if (!password) {
        return NextResponse.json({ error: 'Password required' }, { status: 401 });
      }
      const passwordMatch = await bcrypt.compare(password, shareRecord.passwordHash);
      if (!passwordMatch) {
        return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
      }
    }

    // Increment viewCount
    await db
      .update(shares)
      .set({ viewCount: shareRecord.viewCount + 1 })
      .where(eq(shares.id, id));

    // If viewOnce and viewCount >= 1, mark link invalid (delete or expire)
    if (shareRecord.viewOnce && shareRecord.viewCount + 1 >= 1) {
      await db
        .update(shares)
        .set({ expiresAt: new Date() })
        .where(eq(shares.id, id));
    }

    // Return file info (fileId) for client to fetch and decrypt
    return NextResponse.json({ fileId: shareRecord.fileId });
  } catch (error) {
    console.error('Error accessing share link:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
