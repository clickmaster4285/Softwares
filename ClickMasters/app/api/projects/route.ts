import { NextRequest, NextResponse } from 'next/server';
import Project from '../../../lib/models/Project';
import Category from '../../../lib/models/Category';
import dbConnect from '../../../lib/mongoose';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { IncomingForm } from 'formidable';

export const config = {
  api: { bodyParser: false },
};

// Helper to get ID from query
function getId(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  return searchParams.get('id');
}

// GET all projects
export async function GET() {
  await dbConnect();
  try {
    const projects = await Project.find()
      .populate('category', 'name description')
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json(projects);
  } catch (err: any) {
    console.error("GET /projects error:", err.message);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// POST new project
export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { title, description, url, category, tags, status, thumbnail } = await req.json();
    if (!title || !description || !url || !category || !thumbnail) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const categoryExists = await Category.findOne({ _id: category, deleted: false });
    if (!categoryExists) {
      return NextResponse.json({ message: 'Invalid category' }, { status: 400 });
    }

    const project = await Project.create({ title, description, url, category, tags, status, thumbnail });

    const populated = await Project.findById(project._id)
      .populate('category', 'name description')
      .populate('createdBy', 'email');

    return NextResponse.json(populated, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// PUT update project
export async function PUT(req: NextRequest) {
  await dbConnect();
  try {
    const id = getId(req);
    if (!id) return NextResponse.json({ message: 'ID required' }, { status: 400 });

    const data = await req.json();
    const project = await Project.findByIdAndUpdate(id, data, { new: true })
      .populate('category', 'name description')
      .populate('createdBy', 'email');

    if (!project) return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    return NextResponse.json(project);
  } catch (err: any) {
    console.error("PUT /projects error:", err.message);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// DELETE project
export async function DELETE(req: NextRequest) {
  await dbConnect();
  try {
    const id = getId(req);
    if (!id) return NextResponse.json({ message: 'ID required' }, { status: 400 });

    const deleted = await Project.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ message: 'Project not found' }, { status: 404 });

    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (err: any) {
    console.error("DELETE /projects error:", err.message);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
// Upload image (public)
export async function POST_upload(req: NextRequest) {
  await dbConnect();
  try {
    const form = IncomingForm();
    const data = await new Promise<{ fields: any; files: any }>((resolve, reject) => {
      form.parse(req as any, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const file = Array.isArray(data.files.image) ? data.files.image[0] : data.files.image;
    if (!file) return NextResponse.json({ message: 'No file' }, { status: 400 });

    const buffer = await fs.readFile(file.filepath);
    const filename = Date.now() + '-' + Math.random().toString(36).slice(2) + path.extname(file.originalFilename!);
    const filepath = path.join(process.cwd(), 'public/uploads', filename);
    await mkdir(path.dirname(filepath), { recursive: true });
    await writeFile(filepath, buffer);

    return NextResponse.json({ imageUrl: `/uploads/${filename}` });
  } catch (err) {
    return NextResponse.json({ message: 'Upload failed' }, { status: 500 });
  }
}