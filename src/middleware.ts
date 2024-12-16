import createMiddleware from 'next-intl/middleware';
import { NextResponse, NextRequest } from 'next/server';
import { routing } from './i18n/routing';
import { menus } from './routes';

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const userRoles = req.cookies.get('roles')?.value.split(',') || [];

  console.log('Pathname:', pathname);
  console.log('User Roles:', userRoles);

  const protectedRoutes = ['/users', '/products', '/clients', '/orders'];

  // Verifica se a rota está protegida
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const menu = menus.find((item) => pathname.startsWith(item.link));
    const requiredRoles = menu?.accessBy || [];
    
    console.log('Required Roles:', requiredRoles);

    // Redireciona se o usuário não tem permissão
    if (requiredRoles.length && !requiredRoles.some((role) => userRoles.includes(role))) {
      console.log('Redirecionando para /');
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return createMiddleware(routing)(req);
}

export const config = {
  matcher: ['/', '/(pt|en)/:path*'],
};
