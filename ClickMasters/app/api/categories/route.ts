import { NextRequest, NextResponse } from 'next/server';
import Category from '../../../lib/models/Category';
import dbConnect from '../../../lib/mongoose';

// GET all categories
export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const categories = await Category.find({ deleted: false });
    return NextResponse.json(categories);
  } catch (err) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// CREATE category
export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const data = await req.json();

    const category = await Category.create(data);

    return NextResponse.json(category, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// UPDATE category
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const data = await req.json();

    const category = await Category.findByIdAndUpdate(
      params.id,
      data,
      { new: true }
    );

    if (!category) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (err) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// DELETE category (soft delete)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    await Category.findByIdAndUpdate(params.id, { deleted: true });

    return NextResponse.json({ message: 'Deleted' });
  } catch (err) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}