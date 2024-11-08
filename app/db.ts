import { drizzle } from "drizzle-orm/postgres-js";
import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { eq } from "drizzle-orm";
import postgres from "postgres";
import { genSaltSync, hashSync } from "bcrypt-ts";

// Optionally, if not using email/pass login, you can
// use the Drizzle adapter for Auth.js / NextAuth
// https://authjs.dev/reference/adapter/drizzle
let client = postgres(`${process.env.POSTGRES_URL!}?sslmode=require`);
let db = drizzle(client);

export async function getUser(email: string) {
  const users = await userTable();
  return await db.select().from(users).where(eq(users.email, email));
}

export async function getCompanies(userId: number) {
  const companies = await companyTable();
  return await db.select().from(companies).where(eq(companies.user_id, userId));
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

async function companyTable() {
  return pgTable("Company", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 64 }),
    user_id: integer("user_id"),
  });
}