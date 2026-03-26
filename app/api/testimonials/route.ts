import { NextRequest, NextResponse } from 'next/server';
import Testimonial from '../../../lib/models/Testimonial';
import dbConnect from '../../../lib/mongoose';
import { requireAuth, requireAdmin } from '../../../lib/auth';

// Define proper error types
interface MongoError extends Error {
  name: string;
  errors?: Record<string, any>;
}

interface ValidationError extends Error {
  name: 'ValidationError';
  errors: Record<string, any>;
}

// Type guard to check if error is a MongoError
function isMongoError(error: unknown): error is MongoError {
  return error instanceof Error && 'name' in error;
}

// Type guard to check if error is a ValidationError
function isValidationError(error: unknown): error is ValidationError {
  return error instanceof Error && error.name === 'ValidationError';
}

export const revalidate = 3600;

// GET all testimonials (public)
export async function GET() {
  try {
    await dbConnect();

    const testimonials = await Testimonial.find().sort({ createdAt: -1 }).limit(12).lean();

    return NextResponse.json(testimonials);
  } catch (err) {
    console.error('GET /api/testimonials error:', err);

    // Check for specific MongoDB errors
    if (isMongoError(err) && err.name === 'MongoNetworkError') {
      return NextResponse.json({ message: 'Database connection error' }, { status: 503 });
    }

    return NextResponse.json({ message: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

// POST a new testimonial (protected)
export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // Authentication with detailed error handling
    let token;
    try {
      token = await requireAuth(req);
      requireAdmin(token);
    } catch (authError) {
      console.error('Authentication error:', authError);
      return NextResponse.json(
        { message: 'Authentication failed. Admin access required.' },
        { status: 401 }
      );
    }

    // Parse request body with error handling
    let body;
    try {
      body = await req.json();
    } catch (parseError) {
      return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
    }

    const { authorName, authorRole, authorCompany, content, avatarUrl, rating, isActive } = body;

    // Validate required fields
    if (!authorName || typeof authorName !== 'string' || authorName.trim().length === 0) {
      return NextResponse.json(
        { message: 'authorName is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return NextResponse.json(
        { message: 'content is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    // Validate rating
    const validatedRating = Math.min(5, Math.max(1, Number(rating) || 5));

    // Validate and sanitize inputs
    const testimonialData = {
      authorName: authorName.trim(),
      authorRole: authorRole ? String(authorRole).trim() : '',
      authorCompany: authorCompany ? String(authorCompany).trim() : '',
      content: content.trim(),
      avatarUrl: avatarUrl ? String(avatarUrl).trim() : '',
      rating: validatedRating,
      isActive: isActive !== undefined ? Boolean(isActive) : true,
    };

    // Create testimonial with validation
    let testimonial;
    try {
      testimonial = await Testimonial.create(testimonialData);
    } catch (dbError) {
      console.error('Database create error:', dbError);

      if (isValidationError(dbError)) {
        return NextResponse.json(
          { message: 'Validation error', errors: dbError.errors },
          { status: 400 }
        );
      }

      throw dbError;
    }

    return NextResponse.json(testimonial, { status: 201 });
  } catch (err) {
    const error = err as Error;
    console.error('POST /api/testimonials error:', error);

    // Log full error details for debugging
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });

    return NextResponse.json({ message: 'Failed to create testimonial' }, { status: 500 });
  }
}

// PUT update a testimonial by ID (protected)
export async function PUT(req: NextRequest) {
  try {
    await dbConnect();

    // Authentication
    let token;
    try {
      token = await requireAuth(req);
      requireAdmin(token);
    } catch (authError) {
      console.error('Authentication error:', authError);
      return NextResponse.json(
        { message: 'Authentication failed. Admin access required.' },
        { status: 401 }
      );
    }

    // Get ID from URL
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Testimonial ID is required' }, { status: 400 });
    }

    // Validate MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json({ message: 'Invalid testimonial ID format' }, { status: 400 });
    }

    // Parse request body
    let body;
    try {
      body = await req.json();
    } catch (parseError) {
      return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
    }

    // Check if testimonial exists
    const existingTestimonial = await Testimonial.findById(id);
    if (!existingTestimonial) {
      return NextResponse.json({ message: 'Testimonial not found' }, { status: 404 });
    }

    // Define update data type
    interface UpdateData {
      authorName?: string;
      authorRole?: string;
      authorCompany?: string;
      content?: string;
      avatarUrl?: string;
      rating?: number;
      isActive?: boolean;
    }

    // Sanitize and prepare update data
    const updateData: UpdateData = {};

    if (body.authorName !== undefined) {
      updateData.authorName = String(body.authorName).trim();
    }
    if (body.authorRole !== undefined) {
      updateData.authorRole = String(body.authorRole).trim();
    }
    if (body.authorCompany !== undefined) {
      updateData.authorCompany = String(body.authorCompany).trim();
    }
    if (body.content !== undefined) {
      updateData.content = String(body.content).trim();
    }
    if (body.avatarUrl !== undefined) {
      updateData.avatarUrl = String(body.avatarUrl).trim();
    }
    if (body.rating !== undefined) {
      updateData.rating = Math.min(5, Math.max(1, Number(body.rating) || 5));
    }
    if (body.isActive !== undefined) {
      updateData.isActive = Boolean(body.isActive);
    }

    // Validate required fields if they're being updated
    if (updateData.authorName !== undefined && updateData.authorName.length === 0) {
      return NextResponse.json({ message: 'authorName cannot be empty' }, { status: 400 });
    }

    if (updateData.content !== undefined && updateData.content.length === 0) {
      return NextResponse.json({ message: 'content cannot be empty' }, { status: 400 });
    }

    // Update testimonial
    let updated;
    try {
      updated = await Testimonial.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
        context: 'query',
      });
    } catch (dbError) {
      console.error('Database update error:', dbError);

      if (isValidationError(dbError)) {
        return NextResponse.json(
          { message: 'Validation error', errors: dbError.errors },
          { status: 400 }
        );
      }

      throw dbError;
    }

    return NextResponse.json(updated);
  } catch (err) {
    const error = err as Error;
    console.error('PUT /api/testimonials error:', error);

    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });

    return NextResponse.json({ message: 'Failed to update testimonial' }, { status: 500 });
  }
}

// DELETE a testimonial by ID (protected)
export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();

    // Authentication
    let token;
    try {
      token = await requireAuth(req);
      requireAdmin(token);
    } catch (authError) {
      console.error('Authentication error:', authError);
      return NextResponse.json(
        { message: 'Authentication failed. Admin access required.' },
        { status: 401 }
      );
    }

    // Get ID from URL
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Testimonial ID is required' }, { status: 400 });
    }

    // Validate MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json({ message: 'Invalid testimonial ID format' }, { status: 400 });
    }

    // Delete testimonial
    let deleted;
    try {
      deleted = await Testimonial.findByIdAndDelete(id);
    } catch (dbError) {
      console.error('Database delete error:', dbError);
      throw dbError;
    }

    if (!deleted) {
      return NextResponse.json({ message: 'Testimonial not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Testimonial deleted successfully',
      id: id,
    });
  } catch (err) {
    const error = err as Error;
    console.error('DELETE /api/testimonials error:', error);

    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });

    return NextResponse.json({ message: 'Failed to delete testimonial' }, { status: 500 });
  }
}

// Optional: Add OPTIONS handler for CORS if needed
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      Allow: 'GET, POST, PUT, DELETE, OPTIONS',
    },
  });
}
