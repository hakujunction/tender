import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function GET(req: Request) {
  const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
          {"role": "user", "content": "write a haiku about ai"}
      ]
  });

  if (!completion.choices) {
      return Response.json({ message: 'No completion found' });
  }

  return Response.json({ message: completion.choices[0].message.content?.split('\n') });
}