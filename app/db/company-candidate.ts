import { pgTable, serial, integer } from "drizzle-orm/pg-core";
import { eq } from "drizzle-orm";
import { db } from "./client";
import { userTable } from "./user";

export async function getCompanyCandidates(companyId: number) {
  const users = await userTable();
  const companyCandidates = await companyCandidateTable();
  const candidates = await db
    .select()
    .from(companyCandidates)
    .leftJoin(users, eq(companyCandidates.user_id, users.id))
    .where(eq(companyCandidates.company_id, companyId));
  return candidates;
}

export async function getAppliedCompanies(userId: number) {
  const companyCandidates = await companyCandidateTable();
  const companies = await db
    .select()
    .from(companyCandidates)
    .where(eq(companyCandidates.user_id, userId));
  return companies;
}

export async function insertCompanyCandidate(companyId: number, userId: number, matchPercent: number) {
  const companyCandidates = await companyCandidateTable();
  await db.insert(companyCandidates).values({ company_id: companyId, user_id: userId, match_percent: matchPercent });
}

export async function companyCandidateTable() {
  return pgTable("CompanyCandidate", {
    id: serial("id").primaryKey(),
    company_id: integer("company_id"),
    user_id: integer("user_id"),
    match_percent: integer("match_percent"),
  });
}
