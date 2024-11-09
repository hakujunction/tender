// @types\next-auth.d.ts
import NextAuth from "next-auth";
import { User } from "../app/types";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] &
      User & {
        id: number;
      };
  }
}
