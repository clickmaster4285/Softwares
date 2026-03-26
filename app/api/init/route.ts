import { NextRequest, NextResponse } from 'next/server';
import { ensureAdminUser } from '../../../lib/ensureAdmin';

export async function GET(req: NextRequest) {
  try {
    await ensureAdminUser();
    return NextResponse.json({ message: 'Initialization completed' });
  } catch (error: any) {
    console.error('Initialization error:', error);
    return NextResponse.json(
      { message: 'Initialization failed: ' + error.message },
      { status: 500 }
    );
  }
}
