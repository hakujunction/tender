"use server";

import OpenAI from "openai";
import {auth} from "app/auth";
import {getSearchParams, updateSearchParams} from "app/db/user";
import {addMessage, getChat} from "app/db/chat"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function getMessages() {
  const session = await auth();

  if (!session?.user?.email) {
    return [];
  }

  return getChat(session.user.email);
}


export async function answer(text: string) {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  const searchParams = await getSearchParams(session.user.email);

  await addMessage(session.user.email, session.user.email, text);

  if (!searchParams.skills.length) {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {"role": "system", "content": "Parse the following text and provide a JSON array of the skills mentioned in one line without markdown."},
        {"role": "user", "content": text}
      ]
    });

    console.log(completion.choices[0].message.content);

    const skills = JSON.parse(completion.choices[0].message.content!);

    await updateSearchParams(session.user.email, {
      ...searchParams,
      skills
    });

    await addMessage(session.user.email, "system", `I have detected the following skills: ${skills.join(", ")}`);

  } else {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {"role": "system", "content": "Parse the following text and return a JSON array of the relevant tags which is important for the developer: [career, money, health, relationships, sport, lifestyle]"},
        {"role": "user", "content": text}
      ]
    });

    console.log(completion.choices[0].message.content);

    const tags = JSON.parse(completion.choices[0].message.content!);

    await updateSearchParams(session.user.email, {
      ...searchParams,
      tags: JSON.parse(completion.choices[0].message.content!)
    });

    await addMessage(session.user.email, "system", `I have detected the following tags: ${tags.join(", ")}`);
  }
}
