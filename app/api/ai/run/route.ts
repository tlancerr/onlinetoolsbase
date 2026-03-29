import OpenAI from "openai";

export async function POST(req: Request) {

  const { prompt } = await req.json()

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are an SEO expert." },
      { role: "user", content: prompt }
    ]
  })

  return Response.json({
    result: response.choices[0].message.content
  })
}
