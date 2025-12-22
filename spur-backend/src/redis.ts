import { createClient } from "redis";

let redisClient: ReturnType<typeof createClient> | null = null;

export async function initRedis() {
  const redisUrl = process.env.REDIS_URL;

  const finalRedisUrl =
    !redisUrl || redisUrl === "<optional>" ? "redis://127.0.0.1:6379" : redisUrl;

  try {
    redisClient = createClient({ url: finalRedisUrl });

    redisClient.on("error", (err) => {
      console.error("Redis error:", err);
    });

    await redisClient.connect();
    console.log(`✅ Redis connected (${finalRedisUrl})`);

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
