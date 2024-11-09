import { eq } from "drizzle-orm";
import { pgTable, serial, varchar, json } from "drizzle-orm/pg-core";
import { db } from "./client";

export async function getCompany() {
  const companies = await companyTable();
  const company = await db.select().from(companies).where(eq(companies.id, 1)).limit(1);
  return company[0];
}

type Company = {
  name: string;
  location: string;
  industry: string;
  size: string;
  description: string;
  requirements: string;
}

export async function getAllCompanies() {
  const companies = await companyTable();
  return db.select().from(companies);
}

export async function insertCompanies(companies: Company[]) {
  const companiesTable = await companyTable();
  await db.insert(companiesTable).values(companies);
}

export async function insertCompany(company: Company) {
  const companies = await companyTable();
  await db.insert(companies).values([company]);
}

export async function companyTable() {
  return pgTable("Company", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 64 }),
    location: varchar("location", { length: 64 }),
    industry: varchar("industry", { length: 64 }),
    size: varchar("size", { length: 64 }),
    description: varchar("description", { length: 255 }),
    requirements: varchar("requirements", { length: 255 }),
    tags: json("tags"),
    skills: json("skills"),
  });
}
