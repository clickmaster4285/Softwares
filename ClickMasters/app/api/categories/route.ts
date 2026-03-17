import { NextRequest, NextResponse } from 'next/server';
import Category from '../../../lib/models/Category';
import dbConnect from '../../../lib/mongoose';
import { requireAuth, requireAdmin } from '../../../lib/auth';

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const categories = await Category.find({ deleted: false });
    return NextResponse.json(categories);
  } catch (err) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const token = await requireAuth(req);
    requireAdmin(token);
    const data = await req.json();
    const category = await Category.create(data);
    return NextResponse.json(category, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const token = await requireAuth(req);
    requireAdmin(token);
    const data = await req.json();
    const category = await Category.findByIdAndUpdate(params.id, data, { new: true });
    return NextResponse.json(category || { message: 'Not found' }, { status: category ? 200 : 404 });
  } catch (err) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const token = await requireAuth(req);
    requireAdmin(token);
    await Category.findByIdAndUpdate(params.id, { deleted: true });
    return NextResponse.json({ message: 'Deleted' });
  } catch (err) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
