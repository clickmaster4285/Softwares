import { NextRequest, NextResponse } from 'next/server';
import Category from '../../../lib/models/Category';
import dbConnect from '../../../lib/mongoose';

// Helper to get ID from query string
function getId(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  return searchParams.get('id');
}

// GET all categories
export async function GET() {
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
export async function PUT(req: NextRequest) {
  await dbConnect();
  try {
    const id = getId(req);
    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    const data = await req.json();

    const category = await Category.findByIdAndUpdate(id, data, { new: true });

    if (!category) {
      return NextResponse.json({ message: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (err) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// DELETE category (soft delete)
export async function DELETE(req: NextRequest) {
  await dbConnect();
  try {
    const id = getId(req);
    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    const category = await Category.findByIdAndUpdate(id, { deleted: true });

    if (!category) {
      return NextResponse.json({ message: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (err) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}