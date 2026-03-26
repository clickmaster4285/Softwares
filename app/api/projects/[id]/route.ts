import { NextRequest, NextResponse } from 'next/server';
import Project from '../../../../lib/models/Project';
import dbConnect from '../../../../lib/mongoose';

export async function GET(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  await dbConnect();
  try {
    const project = await Project.findById(id).populate('category', 'name description').lean();
    if (!project) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (err: unknown) {
    console.error('GET /api/projects/[id] error:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
