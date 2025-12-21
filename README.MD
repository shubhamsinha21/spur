# Spur AI Chat - Take-Home Assignment

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

2. Conversation persistence using session IDs

3. Typing indicator while waiting for AI response

4. Robust error handling (API failures, empty input)

5. Modern, responsive chat UI with TailwindCSS

6. “Start new chat” functionality

6. Session persistence across page reloads

## How to Run Locally

### Backend

```bash
cd spur-backend
 npm install
 Setup .env file with:
 PORT=5001
 OPENAI_API_KEY=<your_openai_key>
 DATABASE_URL=<postgresql://username@localhost:5432/app_name>
 REDIS_URL=<optional_redis_url>

npm run dev
```

### Frontend

```bash
cd spur-frontend
npm install
npm run dev
```
# Open in browser: http://localhost:5173

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

**System prompt**:

- "You are a helpful support agent for a small e-commerce store. Answer clearly and concisely."

**Seeded FAQs**:

- Shipping: Ships worldwide within 5-10 days

- Return policy: 30-day refund/return

- Support hours: 9am-6pm IST

**Other details**:

- Max tokens capped for cost control

- Errors/timeouts handled gracefully