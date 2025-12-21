"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReply = generateReply;
require("dotenv/config");
const openai_1 = __importDefault(require("openai"));
if (!process.env.OPENAI_API_KEY)
    throw new Error("OPENAI_API_KEY not set");
const openai = new openai_1.default({ apiKey: process.env.OPENAI_API_KEY });
async function generateReply(history, userMessage) {
    const systemPrompt = "You are a helpful support agent for a small e-commerce store. Answer clearly and concisely. Here are some FAQs: Shipping policy: Ships worldwide within 5-10 days. Return policy: 30 days return/refund. Support hours: 9am-6pm IST.";
    // Build messages array (cast to any to satisfy SDK types)
    const messages = [
        { role: "system", content: systemPrompt },
        ...history.map(m => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.text
        })),
        { role: "user", content: userMessage }
    ];
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: messages,
            max_tokens: 300
        });
        return response.choices?.[0]?.message?.content || "Sorry, I couldn't generate a reply.";
    }
    catch (err) {
        console.error(err);
        return "Sorry, something went wrong. Please try again later.";
    }
}
