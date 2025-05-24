import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Middleware - All cookies:', request.cookies.getAll());
  const token = request.cookies.get('token');
  console.log('Middleware - Token cookie:', token);
  const { pathname } = request.nextUrl;
  console.log('Middleware - Current pathname:', pathname);

  const isDashboardPath = pathname.startsWith('/dashboard');

  if (!token && isDashboardPath) {
    console.log('Middleware - No token found, redirecting to login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && (pathname === '/login' || pathname === '/register')) {
    console.log('Middleware - Token found, redirecting to dashboard');
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 