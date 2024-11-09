import { eq } from "drizzle-orm";
import { pgTable, serial, varchar, integer } from "drizzle-orm/pg-core";
import { db } from "./client";

export async function getCompany() {
  const companies = await companyTable();
  const company = await db.select().from(companies).where(eq(companies.user_id, 1)).limit(1);
  return company[0];
}

async function companyTable() {
  return pgTable("Company", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 64 }),
  });
}
