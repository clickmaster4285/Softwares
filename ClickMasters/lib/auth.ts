import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export function getTokenFromCookies() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  return token;
}

export async function verifyToken(token: string) {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET not set');
  return jwt.verify(token, process.env.JWT_SECRET) as { id: string; email: string };
}

export function requireAuth(request: NextRequest) {
  const token = getTokenFromCookies();
  if (!token) throw new Error('Unauthorized');
  const decoded = verifyToken(token);
  return decoded;
}

export function requireAdmin(decoded: any) {
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  if (decoded.email !== ADMIN_EMAIL) throw new Error('Admin only');
  return true;
}

