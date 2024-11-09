"use server";
import { openai } from "app/ai";
import {getSearchParams, getUser, getUserCompanies, setUserCompanies} from "app/db/user";
import {auth} from "app/auth";
import { addEvents, getAllCompanies, getAllEvents, getAppliedCompanies, insertCompanyCandidate } from "app/db";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export async function getCompanies() {
  const session = await auth();

  if (!session?.user?.email) {
    return {companies: [], applications: []};
  }
  const user = await getUser(session.user.email);

  const [dbUserCompanies, applications] = await Promise.all([
    getUserCompanies(session.user.email),
    getAppliedCompanies(user.id)
  ]);

  if (dbUserCompanies.length > 0) {
    return {companies: dbUserCompanies, applications};
  }

  const dbCompanies = await getAllCompanies();
  const searchParams = await getSearchParams(session.user.email);

  const dbCompaniesSkillsTagsAndIds = dbCompanies.map((company: any) => {
    return {
      id: company.id,
      skills: company.skills,
      tags: company.tags,
    };
  });

  const mapCompanies: Map<number, any> = dbCompanies.reduce((acc: Map<number, any>, company: any) => {
    acc.set(company.id, company);
    return acc;
  }, new Map());


  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {"role": "user", "content": `Sort companies based on my skills and print one by one per line ${JSON.stringify(dbCompaniesSkillsTagsAndIds)}.`},
      {"role": "user", "content": `I have ${searchParams.skills.length} skills: ${searchParams.skills.join(", ")}. I have the following interests: ${searchParams.tags.join(', ')}.`},
      {"role": "user", "content": `Print strictly only JSON inline one per line without markdown like \`\`\`json and always number match_percent for each company with value strictly from 0 to 99. Very important doesn't change format of every item and save the same ID in JSON array`},
    ]
  });

  const companies = completion.choices[0].message.content!.split("\n").map((line: string) => JSON.parse(line)).map((company: any, idx: number) => {
    return {
      ...company,
      name: `Company ${idx + 1}`,
    }
  });

  const companiesResult = companies.map((company: any) => {
    return {
      ...company,
      match_percent: company.match_percent ?? randomInt(0, 99),
      ...mapCompanies.get(company.id),
    };
  });

  await setUserCompanies(session.user.email, companiesResult);

  return {companies: companiesResult, applications};
}

type Company = {
  name: string;
  location: string;
  industry: string;
  size: string;
  description: string;
  requirements: string;
}

export async function applyToCompany(company: any) {
  console.log(company);
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

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {"role": "system", "content": `User applies to company ${JSON.stringify(company)}. Generate 5 events starting from ${new Date().toLocaleDateString()} in JSON strictly in one JSON per line with list of events for roadmap to prepare for interview in format: {"date_start": "unix timestamp", "date_end", "name": "Event name", "description": "Event description with steps and usefull links"}.`},
      {"role": "user", "content": `I have ${eventsIntervals.length} events in my calendar: ${JSON.stringify(eventsIntervals)}.`},
      {"role": "user", "content": `Please create them in between 8 am and 8 pm and only in the future but not later then this month. And print strictly only JSON inline one per line without markdown like \`\`\`json.`},
    ]
  });

  const events = completion.choices[0].message.content!.split("\n").map((line: string) => JSON.parse(line));

  await addEvents(user.id, events);
  console.log("Company ", company.id, "User ", user.id, "Match percent ", company.match_percent);
  await insertCompanyCandidate(company.id, user.id, company.match_percent);
}
