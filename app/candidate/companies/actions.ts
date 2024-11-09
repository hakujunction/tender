"use server";
import { openai } from "app/ai";
import {getSearchParams, getUser} from "app/db/user";
import {auth} from "app/auth";
import { addEvents, getAllEvents } from "app/db";

export async function getCompanies() {
  const session = await auth();

  if (!session?.user?.email) {
    return [];
  }

  const searchParams = await getSearchParams(session.user.email);

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {"role": "system", "content": `Generate a list of 10 companies that match the provided information about candidate in strict one-line JSON format one JSON per line without any additional symbols: {"name": "Company Name", "location": "City, Country", "industry": "Industry", "size": "Size", "description": "Long enough description", "requirements": "Requirements"}.`},
      {"role": "user", "content": `I have ${searchParams.skills.length} skills: ${searchParams.skills.join(", ")}. I have the following interests: ${searchParams.tags.join(', ')}.`},
    ]
  });

  return completion.choices[0].message.content!.split("\n").map((line: string) => JSON.parse(line));

}

type Company = {
  name: string;
  location: string;
  industry: string;
  size: string;
  description: string;
  requirements: string;
}

export async function applyToCompany(company: Company) {
  const session = await auth();

  if (!session?.user?.email) {
    return;
  }
  const user = await getUser(session.user.email);


  const currentEvents = await getAllEvents(user.id);
  const eventsIntervals = currentEvents.filter(event => {
    return event.date_start && event.date_end;
  }).map((event) => {
    return {
      start: event.date_start!.toString(),
      end: event.date_end!.toString(),
    };
  });

  console.log(eventsIntervals);

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {"role": "system", "content": `User applies to company ${JSON.stringify(company)}. Generate 5 events starting from ${new Date().toLocaleDateString()} in JSON strictly in one JSON per line with list of events for roadmap to prepare for interview in format: {"date_start": "unix timestamp", "date_end", "name": "Event name", "description": "Event description with steps and usefull links"}.`},
      {"role": "user", "content": `I have ${eventsIntervals.length} events in my calendar: ${JSON.stringify(eventsIntervals)}.`},
      {"role": "user", "content": `Please create them in between 8 am and 8 pm.`},
    ]
  });

  const events = completion.choices[0].message.content!.split("\n").map((line: string) => JSON.parse(line));

  await addEvents(user.id, events);
}
