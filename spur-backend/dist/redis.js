"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRedis = initRedis;
exports.getRedisClient = getRedisClient;
const redis_1 = require("redis");
let redisClient = null;
async function initRedis() {
    const redisUrl = process.env.REDIS_URL;
    if (!redisUrl || redisUrl === "<optional>") {
        console.log("⚠️ Redis disabled: invalid or missing REDIS_URL");
        return null;
    }
    try {
        redisClient = (0, redis_1.createClient)({ url: redisUrl });
        redisClient.on("error", (err) => {
            console.error("Redis error:", err);
        });
        await redisClient.connect();
        console.log("✅ Redis connected");
        return redisClient;
    }
    catch (err) {
        console.error("❌ Redis connection failed, continuing without Redis");
        redisClient = null;
        return null;
    }
}
function getRedisClient() {
    return redisClient;
}
