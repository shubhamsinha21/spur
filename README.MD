# Spur AI Chat

### A mini AI support agent simulating a live chat widget using React, Node.js, PostgreSQL, Redis, and OpenAI.

---

## 🧠 Tech Stack 

**Frontend**: React + TypeScript + TailwindCSS  
**Backend**: Node.js + TypeScript + Express  
**Cache**: Redis (optional, for session caching)  
**LLM**: OpenAI GPT-4o-mini  

---

## ⚙️ Features

- End-to-end AI chat (user → backend → LLM → response → frontend)  
- Suggested questions for quick start  
- Conversation persistence using session IDs  
- Typing indicator for real-time feel  
- Robust error handling (API failures, empty input)  
- Responsive chat UI with TailwindCSS  
- “Start new chat” functionality  
- Session persistence across reloads  
- Smooth scrolling + message history  
- Friendly greeting messages for better UX  

---

## 🌐 Deployment

- **Frontend**: Vercel  
- **Backend**: Render  

---

## 🔐 Environment Variables

### Backend (`.env`)
```bash
PORT=5000
OPENAI_API_KEY=<your_openai_api_key>
PG_CONNECTION_STRING=<postgresql://username:password@host:port/db_name>
REDIS_URL=<optional_redis_url>
```

### Frontend (`.env`)
```bash
VITE_API_URL=https://<your_render_backend_url>/chat
```

---

## 🛠️ Run Locally

### Backend
```bash
cd spur-backend
npm install
npm run dev
```

### Frontend
```bash
cd spur-frontend
npm install
npm run dev
```

Open in browser: http://localhost:5173

---

## 🗄️ Database Setup

```sql
CREATE DATABASE spur_chat;

CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  createdAt TIMESTAMP DEFAULT NOW()
);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversationId UUID REFERENCES conversations(id),
  sender VARCHAR(10) NOT NULL,
  text TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW()
);
```

---

## 🏗️ Architecture

```
Frontend (React + Tailwind)
        ↓
Backend API (Express + TypeScript)
        ↓
PostgreSQL <-> Redis (optional)
        ↓
OpenAI (GPT-4o-mini)
```

---

## 🔍 System Notes

- `/chat/message` handles user input and AI response  
- LLM logic is encapsulated in `generateReply(history, userMessage)`  
- Conversation state maintained via `conversationId`  
- Designed to extend into multi-channel systems (WhatsApp, etc.)  

---

## 🤖 LLM Details

**Model**: GPT-4o-mini  

**System Prompt**:
> You are a helpful support agent for a small e-commerce store. Answer clearly and concisely.

**Seeded FAQs**:
- Shipping: 5–10 days worldwide  
- Returns: 30-day policy  
- Support: 9am–6pm IST  

**Other**:
- Token limits for cost control  
- Graceful handling of API failures/timeouts  

---

## 🧪 Testing Flow

1. Open deployed or local frontend  
2. Try suggested prompts (e.g., support hours)  
3. Ask follow-up questions  
4. Start a new chat to reset session  

Session persists across reloads.

---

## ⚠️ Demo Note

This project runs on free-tier services (OpenAI + Render), so the live demo may occasionally be slow or fail due to API limits or cold starts.

If that happens, the codebase reflects the intended behavior — happy to walk through it or share a quick demo.

---

## 📌 Summary

This project focuses on building a **realistic AI support experience**, handling:
- multi-turn conversations  
- session consistency  
- real-world failure cases  
