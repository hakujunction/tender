import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "../auth.config";
import { getCompany } from "../../db";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize({ email, password }: any) {
        let company = await getCompany();
        if (!company) {
          return null;
        }

        if (email === "demo@demo.com" && password === "demo") {
          return company;
        }

        return null as any;
      },
    }),
  ],
});
