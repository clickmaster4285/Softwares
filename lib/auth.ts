import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export async function getTokenFromCookies() {
  const cookieStore = cookies();

  // Some versions make cookies() a Promise, so ensure await works
  const cookieObj = cookieStore instanceof Promise ? await cookieStore : cookieStore;

  const token = cookieObj.get('token')?.value ?? null;
  return token;
}

export async function verifyToken(token: string) {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET not set');
  return jwt.verify(token, process.env.JWT_SECRET) as { id: string; email: string };
}

export async function requireAuth(_request: NextRequest): Promise<{ id: string; email: string }> {
  const token = await getTokenFromCookies(); // ✅ await because it's async
  if (!token) throw new Error('Unauthorized');

  const decoded = await verifyToken(token); // ✅ await for JWT verification
  return decoded;
}

export function requireAdmin(decoded: any) {
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  if (decoded.email !== ADMIN_EMAIL) throw new Error('Admin only');
  return true;
}

