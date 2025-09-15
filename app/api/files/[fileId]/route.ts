//app/api/files/[fileId]/route.ts

// import { NextRequest, NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";
// import { files } from "@/lib/db/schema";
// import { eq } from "drizzle-orm";

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { fileId: string } }
// ) {
//   try {
//     const { userId } = await auth();
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { fileId } = params;

//     // Get file metadata
//     const [file] = await db
//       .select()
//       .from(files)
//       .where(eq(files.id, fileId));

//     if (!file) {
//       return NextResponse.json({ error: "File not found" }, { status: 404 });
//     }

//     if (file.userId !== userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
//     }

//     // For folders, return metadata
//     if (file.isFolder) {
//       return NextResponse.json(file);
//     }

//     // For files, return encrypted file data and encrypted AES key
//     // Note: In a real implementation, you might want to stream the file from ImageKit
//     // For now, return the metadata with encryptedAesKey and iv
//     return NextResponse.json({
//       ...file,
//       // The fileUrl points to the encrypted file on ImageKit
//       // Client will download from fileUrl and decrypt using encryptedAesKey and iv
//     });
//   } catch (error) {
//     console.error("Error fetching file:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch file" },
//       { status: 500 }
//     );
//   }
// }


//app/api/files/[fileId]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: { fileId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { fileId } = params;

    // Get file metadata
    const [file] = await db
      .select()
      .from(files)
      .where(eq(files.id, fileId));

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    if (file.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // For folders, return metadata
    if (file.isFolder) {
      return NextResponse.json(file);
    }

    // For files, return encrypted file data and encrypted AES key
    // Note: In a real implementation, you might want to stream the file from ImageKit
    // For now, return the metadata with encryptedAesKey
    return NextResponse.json({
      ...file,
      // The fileUrl points to the encrypted file on ImageKit
      // Client will download from fileUrl and decrypt using encryptedAesKey
    });
  } catch (error) {
    console.error("Error fetching file:", error);
    return NextResponse.json(
      { error: "Failed to fetch file" },
      { status: 500 }
    );
  }
}