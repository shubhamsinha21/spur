import { createClient } from "redis";

let redisClient: ReturnType<typeof createClient> | null = null;

export async function initRedis() {
  if (!process.env.REDIS_URL) {
    console.log("⚠️ Redis disabled: REDIS_URL not provided");
    return null;
  }

  try {
    redisClient = createClient({
      url: process.env.REDIS_URL,
    });

    redisClient.on("error", (err) => {
      console.error("Redis error:", err);
    });

    await redisClient.connect();
    console.log("✅ Redis connected");

    return redisClient;
  } catch (err) {
    console.error("❌ Redis connection failed, continuing without Redis");
    redisClient = null;
    return null;
  }
}

export function getRedisClient() {
  return redisClient;
}
