import 'dotenv/config';
import OpenAI from "openai";
import { Message } from "../models/message";

if (!process.env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY not set");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateReply(history: Message[], userMessage: string): Promise<string> {
  const systemPrompt =
    "You are a helpful support agent for a small e-commerce store. Answer clearly and concisely.";

  const messages = [
    { role: "system", content: systemPrompt },
    ...history.map((m) => ({
      role: m.sender === "user" ? "user" : "assistant",
      content: m.text,
    })),
    { role: "user", content: userMessage },
  ];

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages as any,
      max_tokens: 300,
    });

    return (response.choices?.[0] as any)?.message?.content || "Sorry, I couldn't generate a reply.";
  } catch (err) {
    console.error("OpenAI error:", err);
    return "Sorry, something went wrong. Please try again later.";
  }
}
