import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rotas que exigem autenticação
const protectedRoutes = [
  '/dashboard',
  '/expenses',
  '/expenses/create',
  '/profile',
  '/reports',
];

// Rotas de acesso exclusivo para usuários deslogados
const authRoutes = [
  '/login',
  '/register',
];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('cashflow_token')?.value;
  const { pathname } = request.nextUrl;

  // Verificar se a rota está protegida e o usuário não está autenticado
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !token) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    return response;
  }

  // Verificar se o usuário já está autenticado e tenta acessar rotas de login/registro
  if (authRoutes.some(route => pathname === route) && token) {
    const response = NextResponse.redirect(new URL('/dashboard', request.url));
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/expenses/:path*',
    '/profile/:path*',
    '/reports/:path*',
    '/login',
    '/register',
  ],
}; 