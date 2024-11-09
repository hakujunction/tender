import { and, desc, eq } from "drizzle-orm";
import { pgTable, serial, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { db } from "./client";

export async function getMeetings(userId: number) {
  const calendar = await calendarTable();
  const meetings = await db.select().from(calendar).where(eq(calendar.user_id, userId));
  return meetings;
}

export enum EventType {
  Imported = 0,
  InHouse = 1,
};

export type Event = {
  type: EventType;
  date_start: Date;
  date_end: Date;
  name: string;
  description: string;
};

async function calendarTable() {
  return pgTable("Calendar", {
    id: serial("id").primaryKey(),
    user_id: integer("user_id"),
    name: varchar("name", { length: 64 }),
    description: varchar("description", { length: 255 }),
    type: integer("type"),
    date_start: timestamp("date_start"),
    date_end: timestamp("date_end"),
    created_at: timestamp("created_at"),
  });
}

type EventDTO = {
  user_id: number;
  name: string;
  description: string;
  type: EventType;
  date_start: number;
  date_end: number;
}

export async function addEvents(userId: number, events: EventDTO[]) {
  const calendar = await calendarTable();
  await db.insert(calendar).values(events.map((event) => {
    return {
      user_id: userId,
      date_start: new Date(event.date_start * 1000),
      date_end: new Date(event.date_end * 1000),
      name: event.name,
      description: event.description,
      type: event.type,
      created_at: new Date(),
    };
  }));
}

export async function getAllEvents(userId: number) {
  const calendar = await calendarTable();
  const events = await db.select().from(calendar).where(
    eq(calendar.user_id, userId),
  );

  return events;
}

export type Meeting = Awaited<ReturnType<typeof getMeetings>>[number];
