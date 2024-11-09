import { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/company/login",
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      let isLoggedIn = !!auth?.user;
      let isIndexPage = nextUrl.pathname === "/company";
      let isAuthPage = ["/company/login"].some((path) => nextUrl.pathname.startsWith(path));

      if (isIndexPage) return true;
      if (!isAuthPage) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(nextUrl.origin);
      }

      return true;
    },
  },
} satisfies NextAuthConfig;