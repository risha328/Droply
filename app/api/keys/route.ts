//app/api/keys/route.ts

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user's public key from database
    const user = await db
      .select({ publicKey: users.publicKey })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user || !user[0]?.publicKey) {
      return NextResponse.json({ error: "Public key not found" }, { status: 404 });
    }

    return NextResponse.json({ publicKey: user[0].publicKey });
  } catch (error) {
    console.error("Error retrieving public key:", error);
    return NextResponse.json({ error: "Failed to retrieve public key" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { publicKey } = body;

    if (!publicKey) {
      return NextResponse.json({ error: "Public key is required" }, { status: 400 });
    }

    // Upsert user's public key
    await db
      .insert(users)
      .values({
        id: userId,
        publicKey: publicKey,
      })
      .onConflictDoUpdate({
        target: users.id,
        set: {
          publicKey: publicKey,
        },
      });

    return NextResponse.json({ message: "Public key saved successfully" });
  } catch (error) {
    console.error("Error saving public key:", error);
    return NextResponse.json({ error: "Failed to save public key" }, { status: 500 });
  }
}
