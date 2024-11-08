"use server";

import OpenAI from "openai";
import {auth} from "app/auth";
import {getSearchParams, updateSearchParams} from "app/db/user";
import {addMessage, getChat} from "app/db/chat"
import {PdfReader} from "pdfreader";
import {readFileSync} from "fs";

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


export async function answer(text: string, fileBase64: string) {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  const fileBuffer = fileBase64 ? Buffer.from(fileBase64.split(",")[1], "base64") : null;
  const searchParams = await getSearchParams(session.user.email);

  await addMessage(session.user.email, session.user.email, text);

  let resumeText

  if (!searchParams.skills.length) {
    if (fileBuffer) {
      const reader = new PdfReader();
      resumeText = await new Promise<string>((resolve, reject) => {
        let buffer = "";
        reader.parseBuffer(fileBuffer, (err, item) => {
          if (err) {
            reject(err);
          } else if (!item) {
            resolve(buffer);
          } else {
            buffer += item.text!;
          }
        });
      });
    }

    const messages: Array<{role: string, content: string}> = [
      {"role": "system", "content": "Parse the following text and provide a JSON array of the skills mentioned in one line without markdown."},
      {"role": "user", "content": text}
    ];

    if (resumeText) {
      messages.push({"role": "user", "content": `Here is my resume: ${resumeText}`});
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      // @ts-ignore
      messages
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
