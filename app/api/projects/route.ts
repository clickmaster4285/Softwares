import { NextRequest, NextResponse } from 'next/server';
import Project from '../../../lib/models/Project';
import Category from '../../../lib/models/Category';
import CaseStudy from '../../../lib/models/CaseStudy';
import dbConnect from '../../../lib/mongoose';

// Helper to get ID from query
function getId(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  return searchParams.get('id');
}

// GET all projects
export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find()
      .populate('category', 'name description showOnHome')
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
  try {
    await dbConnect();
    const body = await req.json();
    const { title, description, url, category, tags, status, thumbnail } = body;

    if (!title || !description || !url || !category || !thumbnail) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const categoryExists = await Category.findOne({ _id: category, deleted: false });
    if (!categoryExists) {
      return NextResponse.json({ message: 'Invalid category' }, { status: 400 });
    }

    const project = await Project.create({
      title,
      description,
      url,
      category,
      tags,
      status,
      thumbnail,
    });

    const populated = await Project.findById(project._id)
      .populate('category', 'name description showOnHome')
      .populate('createdBy', 'email');

    return NextResponse.json(populated, { status: 201 });
  } catch (err: any) {
    console.error("POST /projects error:", err.message);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// PUT update project - FIXED (removed deprecated 'new' option)
export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const id = getId(req);
    if (!id) {
      return NextResponse.json({ message: 'ID required' }, { status: 400 });
    }

    const data = await req.json();
    
    // ✅ FIXED: Use returnDocument: 'after' instead of new: true
    const project = await Project.findByIdAndUpdate(
      id, 
      data, 
      { 
        returnDocument: 'after',
        runValidators: true 
      }
    )
      .populate('category', 'name description showOnHome')
      .populate('createdBy', 'email');

    if (!project) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }
    
    return NextResponse.json(project);
  } catch (err: any) {
    console.error("PUT /projects error:", err.message);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// DELETE project
export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();
    const id = getId(req);
    if (!id) {
      return NextResponse.json({ message: 'ID required' }, { status: 400 });
    }

    const deleted = await Project.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    await CaseStudy.deleteMany({ project: id });

    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (err: any) {
    console.error("DELETE /projects error:", err.message);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}