"use server";

import { toggleDone } from "app/db";

export async function toggleDoneAction(eventId: number) {
  await toggleDone(eventId);
}
