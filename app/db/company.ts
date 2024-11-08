import { eq } from "drizzle-orm";
import { pgTable, serial, varchar, integer } from "drizzle-orm/pg-core";
import { db } from "./client";

export async function getCompanies(userId: number) {
  const companies = await companyTable();
  return await db.select().from(companies).where(eq(companies.user_id, userId));
}

async function companyTable() {
  return pgTable("Company", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 64 }),
    user_id: integer("user_id"),
  });
}
