import NextAuth from 'next-auth';
import { authConfig } from 'app/auth.config';
import { authConfig as companyAuthConfig } from "app/company/auth.config";
import { NextRequest } from "next/server";

const authMiddleware = NextAuth(authConfig).auth;
const authMiddlewareCompany = NextAuth(companyAuthConfig).auth;

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/company")) {
    // @ts-ignore
    return authMiddlewareCompany(request);
  }

  // @ts-ignore
  return authMiddleware(request);
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
