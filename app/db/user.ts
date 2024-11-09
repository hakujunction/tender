import { json, pgTable, serial, varchar, integer } from "drizzle-orm/pg-core";
import { eq } from "drizzle-orm";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { db } from "./client";
import { UserSearchParams } from "./types";

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

export async function userTable() {
  return pgTable("User", {
    id: serial("id").primaryKey(),
    company_id: integer("company_id"),
    email: varchar("email", { length: 64 }),
    password: varchar("password", { length: 64 }),
    search_params: json("search_params").$type<UserSearchParams>(),
    chat_history: json("chat_history"),
    companies: json("companies").$type<UserCompany[]>(),
    avatar: varchar("avatar", { length: 256 }),
  });
}

type SearchParams = {
  skills: [];
  tags: [];
};

export async function getSearchParams(email: string): Promise<SearchParams> {
  const users = await userTable();
  const [user] = await db
    .select({
      search_params: users.search_params,
    })
    .from(users)
    .where(eq(users.email, email));

  if (!user) {
    return { skills: [], tags: [] };
  }

  if (!user.search_params || Object.keys(user.search_params!).length === 0) {
    return { skills: [], tags: [] };
  }

  return user.search_params as SearchParams;
}

type UserCompany = {
  name: string,
  location: string,
  industry: string,
  size: string,
  description: string,
  requirements: string
}

export async function getUserCompanies(email: string) {
  const users = await userTable();
  const [user] = await db
    .select({
      companies: users.companies,
    })
    .from(users)
    .where(eq(users.email, email));

  if (!user) {
    return [];
  }

  if (!user.companies) {
    return [];
  }

  return user.companies;
}

export async function setUserCompanies(email: string, companies: UserCompany[]) {
  const users = await userTable();
  await db.update(users).set({ companies }).where(eq(users.email, email));
}


export async function updateSearchParams(email: string, searchParams: SearchParams) {
  const users = await userTable();
  await db.update(users).set({ search_params: searchParams }).where(eq(users.email, email));
}
