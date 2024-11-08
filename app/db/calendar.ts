import { eq } from "drizzle-orm";
import { pgTable, serial, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { db } from "./client";

export async function getMeetings(userId: number) {
  const calendar = await calendarTable();
  const meetings = await db.select().from(calendar).where(eq(calendar.user_id, userId));
  return meetings;
}

async function calendarTable() {
  return pgTable("Calendar", {
    id: serial("id").primaryKey(),
    user_id: integer("user_id"),
    name: varchar("name", { length: 64 }),
    type: integer("type"),
    date_start: timestamp("date_start"),
    date_end: timestamp("date_end"),
    created_at: timestamp("created_at"),
  });
}

export type Meeting = Awaited<ReturnType<typeof getMeetings>>[number];
