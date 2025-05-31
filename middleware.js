// app/middleware.js
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Handle register API route - only allow admin users
  if (pathname.startsWith('/api/auth/register')) {
    // If no token or user is not an admin, return 403 Forbidden
    if (!token || !token.user?.isAdmin) {
      return new NextResponse(JSON.stringify({ message: 'Unauthorized access' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    return NextResponse.next();
  }

  // For admin routes
  if (pathname.startsWith('/admin')) {
    // If no token is found, redirect to the login page
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // If user is not an admin, redirect to home page
    if (!token.user?.isAdmin) {
      return NextResponse.redirect(new URL('/home', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/auth/register'
  ],
};
