import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { eq } from "drizzle-orm";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { db } from "./client";

export async function getUser(email: string) {
  const users = await userTable();
  const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return user[0];
}

export async function createUser(email: string, password: string) {
  const users = await userTable();
  let salt = genSaltSync(10);
  let hash = hashSync(password, salt);

  return await db.insert(users).values({ email, password: hash });
}

async function userTable() {
  return pgTable("User", {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 64 }),
    password: varchar("password", { length: 64 }),
  });
}
