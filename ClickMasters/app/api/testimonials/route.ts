import { NextRequest, NextResponse } from 'next/server';
import Testimonial from '../../../lib/models/Testimonial';
import dbConnect from '../../../lib/mongoose';
import { requireAuth, requireAdmin } from '../../../lib/auth';

// GET all testimonials (public)
export async function GET() {
  await dbConnect();
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    return NextResponse.json(testimonials);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// POST a new testimonial (protected)
export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const token = await requireAuth(req); // make sure user is logged in
    requireAdmin(token); // make sure user is admin

    const { authorName, authorRole, authorCompany, content, avatarUrl, rating, isActive } = await req.json();

    // Validate required fields
    if (!authorName || !content) {
      return NextResponse.json({ message: 'authorName and content are required' }, { status: 400 });
    }

    const testimonial = await Testimonial.create({
      authorName,
      authorRole: authorRole || '',
      authorCompany: authorCompany || '',
      content,
      avatarUrl: avatarUrl || '',
      rating: rating || 5,
      isActive: isActive !== undefined ? isActive : true,
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// DELETE a testimonial by ID (protected)
export async function DELETE(req: NextRequest) {
  await dbConnect();
  try {
    const token = await requireAuth(req);
    requireAdmin(token);

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    const deleted = await Testimonial.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ message: 'Testimonial not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}