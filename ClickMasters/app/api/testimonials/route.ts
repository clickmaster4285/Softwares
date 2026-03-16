import { NextRequest, NextResponse } from 'next/server';
import Testimonial from '@/lib/models/Testimonial';
import dbConnect from '@/lib/mongoose';
import { requireAuth, requireAdmin } from '@/lib/auth';

export async function GET(req: NextRequest) {
  await dbConnect();
  const testimonials = await Testimonial.find().sort({ createdAt: -1 });
  return NextResponse.json(testimonials);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const token = await requireAuth(req);
    requireAdmin(token);
    const data = await req.json();
    const testimonial = await Testimonial.create(data);
    return NextResponse.json(testimonial, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const token = await requireAuth(req);
    requireAdmin(token);
    await Testimonial.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Deleted' });
  } catch (err) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
