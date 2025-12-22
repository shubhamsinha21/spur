import { createClient } from "redis";

let redisClient: ReturnType<typeof createClient> | null = null;

export async function initRedis() {
  const redisUrl = process.env.REDIS_URL;

  if (!redisUrl || redisUrl === "<optional>") {
    console.log("⚠️ Redis disabled: invalid or missing REDIS_URL");
    return null;
  }

  try {
    redisClient = createClient({ url: redisUrl });

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
