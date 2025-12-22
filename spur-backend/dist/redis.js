"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRedis = initRedis;
exports.getRedisClient = getRedisClient;
const redis_1 = require("redis");
let redisClient = null;
async function initRedis() {
    const redisUrl = process.env.REDIS_URL;
    const finalRedisUrl = !redisUrl || redisUrl === "<optional>" ? "redis://127.0.0.1:6379" : redisUrl;
    try {
        redisClient = (0, redis_1.createClient)({ url: finalRedisUrl });
        redisClient.on("error", (err) => {
            console.error("Redis error:", err);
        });
        await redisClient.connect();
        console.log(`✅ Redis connected (${finalRedisUrl})`);
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
