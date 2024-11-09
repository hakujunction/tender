import { eq } from "drizzle-orm";
import { db } from "./client";
import { userTable } from "./user";

export async function getChat(email: string) {
  const users = await userTable();
  const [user] = await db.select({
    chat_history: users.chat_history,
  }).from(users).where(eq(users.email, email));

  if (!user) {
    return [];
  }

  return user.chat_history as { text: string; sender: string }[];
}

export async function addMessage(email: string, from: string, text: string) {
  const users = await userTable();
  let chat = await getChat(email);
  chat.push({ text, sender: from });

  await db.update(users).set({ chat_history: chat }).where(eq(users.email, email));
}
