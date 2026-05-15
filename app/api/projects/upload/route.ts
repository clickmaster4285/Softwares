// app/api/projects/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ message: "No file" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Preserve original filename base (e.g. enterprise.jpg -> enterprise.webp)
    // while still avoiding collisions on disk.
    const originalName = file.name || 'upload';
    const parsedExt = path.extname(originalName) || '.jpg';
    const baseName = originalName.slice(0, -parsedExt.length) || originalName;

    // Keep only safe characters in filename
    const safeBase = baseName
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9._-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^[-.]+/, '')
      .replace(/[-.]+$/, '');

    const finalBase = safeBase || 'upload';
    const ext = parsedExt.startsWith('.') ? parsedExt : `.${parsedExt}`;

    let filename = `${finalBase}${ext}`;
    const baseUploadDir = path.join(process.cwd(), "public", "uploads");
    const fullPathFor = (name: string) => path.join(baseUploadDir, name);

    // If file exists, add numeric suffix instead of random filename
    // (e.g. enterprise.webp, enterprise-1.webp, enterprise-2.webp)
    let i = 0;
    let fullPath = fullPathFor(filename);
    while (true) {
      try {
        await (await import('fs/promises')).stat(fullPath);
        // file exists -> try next suffix
        i += 1;
        filename = `${finalBase}-${i}${ext}`;
        fullPath = fullPathFor(filename);
      } catch {
        // stat failed -> file doesn't exist
        break;
      }
    }


    await mkdir(path.dirname(fullPath), { recursive: true });
    await writeFile(fullPath, buffer);


    // CHANGE THIS: Return API route URL instead of direct public URL
    return NextResponse.json({ 
      imageUrl: `/api/uploads/${filename}`  // This will serve the image
    });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ message: "Upload failed" }, { status: 500 });
  }
}