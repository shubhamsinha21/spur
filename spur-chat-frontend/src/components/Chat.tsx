import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";
import axios from "axios";

interface ChatMessage {
  sender: "user" | "ai";
  text: string;
}

const SUGGESTED_QUESTIONS = [
  "Do you ship internationally?",
  "What is your return policy?",
  "How long does shipping take?",
  "What are your support hours?"
];

function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const savedSessionId = localStorage.getItem("chatSessionId");
    if (savedSessionId) setSessionId(savedSessionId);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text?: string) => {
    const messageToSend = text ?? input;
    if (!messageToSend.trim()) return;

    const userMsg: ChatMessage = { sender: "user", text: messageToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/message`, // ✅ Env variable for backend URL
        {
          message: messageToSend,
          sessionId,
        }
      );

      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: res.data.reply },
      ]);

      setSessionId(res.data.sessionId);
      localStorage.setItem("chatSessionId", res.data.sessionId);
    } catch (err) {
      console.error("Chat API error:", err); // Optional debug
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-950 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/10">
          <h2 className="text-white font-semibold text-lg">Spur Support</h2>
          <p className="text-slate-400 text-xs">AI Agent • Online</p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {messages.length === 0 && !loading && (
            <div className="space-y-3">
              <p className="text-slate-400 text-sm">Try asking one of these:</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3 py-1.5 rounded-full transition"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, idx) => (
            <Message key={idx} sender={m.sender} text={m.text} />
          ))}

          {loading && (
            <div className="text-slate-400 text-sm animate-pulse">
              Agent is typing…
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-white/10 p-3">
          <div className="flex gap-2 bg-slate-800 rounded-xl px-3 py-2">
            <input
              className="flex-1 bg-transparent text-white placeholder-slate-400 text-sm focus:outline-none"
              placeholder="Ask a question…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-1 rounded-lg disabled:opacity-50"
            >
              Send
            </button>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem("chatSessionId");
              setSessionId(null);
              setMessages([]);
            }}
            className="mt-3 text-xs text-slate-400 hover:text-white"
          >
            Start new chat
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
