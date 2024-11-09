import { eq } from "drizzle-orm";
import { db } from "./client";
import { userTable } from "./user";

export async function getCompanyUsers(companyId: number) {
  const users = await userTable();
  const companyUsers = await db.select().from(users).where(eq(users.company_id, companyId));
  return companyUsers;
}
