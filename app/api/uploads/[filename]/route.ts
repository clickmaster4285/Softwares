// app/api/uploads/[filename]/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { existsSync } from "fs";

// For Next.js 15+, params is a Promise that needs to be awaited
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    // Await the params Promise
    const { filename } = await params;
    
    // Security: Prevent directory traversal attacks
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return new NextResponse("Invalid filename", { status: 400 });
    }
    
    const filepath = path.join(process.cwd(), "public", "uploads", filename);
    
    // Check if file exists
    if (!existsSync(filepath)) {
      console.log("File not found:", filepath);
      return new NextResponse("File not found", { status: 404 });
    }
    
    // Read the file
    const imageBuffer = await fs.readFile(filepath);
    
    // Determine content type
    const ext = path.extname(filename).toLowerCase();
    const contentType = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
      '.svg': 'image/svg+xml',
    }[ext] || 'image/jpeg';
    
    // Return the image
    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error serving image:", error);
    return new NextResponse("Error serving image", { status: 500 });
  }
}