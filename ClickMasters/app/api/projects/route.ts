import { NextRequest, NextResponse } from 'next/server';
import Project from '@/lib/models/Project';
import Category from '@/lib/models/Category';
import dbConnect from '@/lib/mongoose';
import { requireAuth, requireAdmin } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { IncomingForm } from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const projects = await Project.find()
      .populate('category', 'name description')
      .populate('createdBy', 'email')
      .sort({ createdAt: -1 });
    return NextResponse.json(projects);
  } catch (err) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const token = await requireAuth(req);
    requireAdmin(token);

    const { title, description, url, category, tags, status, thumbnail } = await req.json();
    if (!title || !description || !url || !category || !thumbnail) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const categoryExists = await Category.findOne({ _id: category, deleted: false });
    if (!categoryExists) {
      return NextResponse.json({ message: 'Invalid category' }, { status: 400 });
    }

    const project = await Project.create({
      title, description, url, category, tags, status, thumbnail, createdBy: token.id
    });

    const populated = await Project.findById(project._id)
      .populate('category', 'name description')
      .populate('createdBy', 'email');
    
    return NextResponse.json(populated, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const token = await requireAuth(req);
    requireAdmin(token);

    const data = await req.json();
    const project = await Project.findByIdAndUpdate(params.id, data, { new: true })
      .populate('category', 'name description')
      .populate('createdBy', 'email');
    
    if (!project) return NextResponse.json({ message: 'Not found' }, { status: 404 });
    return NextResponse.json(project);
  } catch (err) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: string }) {
  await dbConnect();
  try {
    const token = await requireAuth(req);
    requireAdmin(token);

    await Project.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Deleted' });
  } catch (err) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// Upload image
export async function POST_upload(req: NextRequest) {
  await dbConnect();
  try {
    const token = await requireAuth(req);
    requireAdmin(token);

    const form = IncomingForm();
    const data = await new Promise((resolve, reject) => {
      form.parse(req as any, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const file = Array.isArray(files.image) ? files.image[0] : files.image;
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

