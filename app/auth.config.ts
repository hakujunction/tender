import { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      let isLoggedIn = !!auth?.user?.email;
      let isAnonymPage = nextUrl.pathname === '/' || nextUrl.pathname.startsWith("/company") || nextUrl.pathname.includes('jpg');
      let isAuthPage = ['/login', '/register'].some((path) =>
        nextUrl.pathname.startsWith(path),
      );

      if (isAnonymPage) return true;
      if (!isAuthPage) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(nextUrl.origin + "/candidate");
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
