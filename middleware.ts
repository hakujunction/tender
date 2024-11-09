import NextAuth from 'next-auth';
import { authConfig } from "app/auth.config";
import { NextRequest } from "next/server";

const authMiddleware = NextAuth(authConfig).auth;

export function middleware(request: NextRequest) {
  // @ts-ignore
  return authMiddleware(request);
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
