"use server";

import {PdfReader} from "pdfreader";

import {openai} from "app/ai"
import {auth} from "app/auth";
import {getSearchParams, updateSearchParams} from "app/db/user";
import {addMessage, getChat} from "app/db/chat"

const systemName = "Tender";

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

  if (text.trim()) {
    await addMessage(session.user.email, session.user.email, text);
  }

  if (fileBase64) {
    await addMessage(session.user.email, session.user.email, `Uploaded file`);
  }

  let resumeText;

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
      {"role": "system", "content": "Parse the following text and provide a JSON array of the skills mentioned in one line strictly without markdown."},
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

    const skills = JSON.parse(completion.choices[0].message.content!);

    await updateSearchParams(session.user.email, {
      ...searchParams,
      skills
    });

    await addMessage(session.user.email, systemName, `I have detected the following skills: ${skills.join(", ")}\n. Now let's move on to the next step. Could you please send me a brief description of your hobbies and interests?`);

  } else if (!searchParams.tags.length) {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {"role": "system", "content": "Parse the following text and return a JSON array of the relevant tags which is important for the developer: [career, money, health, relationships, sport, lifestyle, travel, education, technology, art, fashion, music, cooking, gardening, science, fitness, photography, books, movies, environment, spirituality, self-improvement, volunteering, parenting, DIY projects, gaming, outdoors, meditation, history, social media, entrepreneurship, investing, home decor, adventure, food & drink, pets] in one line strictly without markdown"},
        {"role": "user", "content": text}
      ]
    });

    const tags = JSON.parse(completion.choices[0].message.content!);

    if (!tags.length) {
      await addMessage(session.user.email, systemName, `Could you please provide me with more information?`);
      return;
    }

    await updateSearchParams(session.user.email, {
      ...searchParams,
      tags
    });

    await addMessage(session.user.email, systemName, `Cool! Thank you for sharing. <a href="/candidate/companies" style="color: #69b1ff;" target="_blank">I've found interesting positions for you</a>. Please check them out and apply if you are interested. 🤩`);
  } else {
    const messages = await getChat(session.user.email);

    const resultMessages = [
        ...messages.map(({sender, text}) => ({role: sender === session.user?.email ? "user" : "system", content: text})) as any,
        {"role": "user", "content": `You are talking with developer with the following properties: ${JSON.stringify(searchParams)}. Discuss only questions related to search of well-being companies and job opportunities and work-life balance. Use HTML markup always!!! Please don't mention another services for job search.`},
        {"role": "user", "content": text}
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: resultMessages
    });

    await addMessage(session.user.email, systemName, completion.choices[0].message.content!);
  }
}
