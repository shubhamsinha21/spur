import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import chatRouter from "./routes/chat";
import { initRedis } from "./redis";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/chat", chatRouter);

const PORT = process.env.PORT || 5000;

async function startServer() {
  // Initialize Redis safely (optional, non-blocking)
  await initRedis();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

// Start app
startServer();
