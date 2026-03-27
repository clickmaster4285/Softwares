import { NextRequest, NextResponse } from 'next/server';
import Testimonial from '../../../lib/models/Testimonial';
import dbConnect from '../../../lib/mongoose';

// Helper to get ID from query
function getId(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  return searchParams.get('id');
}

// GET all testimonials (public)
export async function GET() {
  try {
    await dbConnect();
    const testimonials = await Testimonial.find()
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json(testimonials);
  } catch (err: any) {
    console.error("GET /api/testimonials error:", err.message);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// POST new testimonial
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const data = await req.json();
    
    if (!data.authorName || !data.content) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const testimonial = await Testimonial.create(data);
    return NextResponse.json(testimonial, { status: 201 });
  } catch (err: any) {
    console.error("POST /api/testimonials error:", err.message);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// PUT update testimonial
export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const id = getId(req);
    if (!id) {
      return NextResponse.json({ message: 'ID required' }, { status: 400 });
    }

    const data = await req.json();
    
    const testimonial = await Testimonial.findByIdAndUpdate(
      id, 
      data, 
      { 
        returnDocument: 'after',
        runValidators: true 
      }
    );

    if (!testimonial) {
      return NextResponse.json({ message: 'Testimonial not found' }, { status: 404 });
    }
    
    return NextResponse.json(testimonial);
  } catch (err: any) {
    console.error("PUT /api/testimonials error:", err.message);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// DELETE testimonial
export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();
    const id = getId(req);
    if (!id) {
      return NextResponse.json({ message: 'ID required' }, { status: 400 });
    }

    const deleted = await Testimonial.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ message: 'Testimonial not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (err: any) {
    console.error("DELETE /api/testimonials error:", err.message);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

