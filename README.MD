# Spur AI Chat

### A mini AI support agent simulating a live chat widget using React, Node.js, PostgreSQL, Redis, and OpenAI.

## Demo / Screenshot



## Tech Stack 

**Frontend**: React + TypeScript + TailwindCSS

**Backend**: Node.js + TypeScript + Express

**Database**: PostgreSQL

**Cache**: Redis (optional, for session caching)

**LLM**: OpenAI GPT-4o-mini

## Features Implemented

1. End-to-end AI chat (user → backend → LLM → AI response → frontend)

2. Suggested questions for quick start

3. Conversation persistence using session IDs

4. Typing indicator while waiting for AI response

5. Robust error handling (API failures, empty input)

6. Modern, responsive chat UI with TailwindCSS

7. “Start new chat” functionality

8. Session persistence across page reloads

9. Smooth scrolling and message history display

10. ✅ Extra polish: Friendly greeting messages and session persistence across reloads

## Deployment 

**Backend** Deployed on Render
**Frontend** Deployed on Vercel

## Environment variables

**Backend(.env)** 

```bash

PORT=5000
OPENAI_API_KEY=<your_openai_api_key>
PG_CONNECTION_STRING=<postgresql://username:password@host:port/db_name>
REDIS_URL=<optional_redis_url>
```

**Frontend(.env)**

```bash

VITE_API_URL=https://<your_render_backend_url>/chat
```

## How to Run Locally

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

 ***Open in browser: http://localhost:5173***

### Database setup
```bash
CREATE DATABASE spur_chat;

-- conversations table
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  createdAt TIMESTAMP DEFAULT NOW()
);

-- messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversationId UUID REFERENCES conversations(id),
  sender VARCHAR(10) NOT NULL, -- "user" | "ai"
  text TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW()
);
```

## Architecture Overview

Frontend (React + Tailwind)
          |
          v
Backend API (Express + TypeScript)
          |
          v
Database (PostgreSQL) <-> Optional Redis Cache
          |
          v
LLM Service (OpenAI GPT-4o-mini)

**Notes**

- /chat/message endpoint handles messages and returns AI replies

- LLM call is encapsulated in generateReply(history, userMessage)

- Messages stored with conversationId for session persistence

- Modular design allows adding new channels (WhatsApp, Instagram, FB) easily

## LLM Integration

**OPENAI Model Used**: gpt-4o-mini

**System prompt**:

- "You are a helpful support agent for a small e-commerce store. Answer clearly and concisely."

**Seeded FAQs**:

- Shipping: Ships worldwide within 5-10 days

- Return policy: 30-day refund/return

- Support hours: 9am-6pm IST

**Other details**:

- Max tokens capped for cost control

- Errors/timeouts handled gracefully

## Testing flow (Frontend)

1. Open frontend URL (local or Vercel)

2. Click on suggested questions, e.g., “What are your support hours?”

3. Verify AI response appears below

4. Ask follow-up questions, e.g., “Can I reach out on Saturday?”

5. Use “Start new chat” to reset session

Note-> Session persists across reloads. Frontend directly communicates with Render backend.
