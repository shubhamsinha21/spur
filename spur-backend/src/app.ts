import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import chatRouter from "./routes/chat";
import { initRedis } from "./redis";
import { runMigrations } from "./db/migration";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/chat", chatRouter);

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Run DB migrations first
    await runMigrations();
    console.log("✅ Migrations completed");

    // Initialize Redis safely (optional, non-blocking)
    await initRedis();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1); // Exit if migrations fail
  }
}

// Start app
startServer();
