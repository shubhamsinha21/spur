import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import chatRouter from "./routes/chat";
import { initRedis } from "./redis";
import { runMigrations } from "./db/migration";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route for health check
app.get("/", (req, res) => {
  res.send("🚀 Server is running! Use /chat endpoint for requests.");
});

// Chat API
app.use("/chat", chatRouter);

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Run DB migrations
    await runMigrations();
    console.log("✅ Migrations completed");

    // Initialize Redis
    await initRedis();
    console.log("✅ Redis connected");

    // Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
