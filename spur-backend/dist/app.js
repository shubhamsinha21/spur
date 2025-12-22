"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const chat_1 = __importDefault(require("./routes/chat"));
const redis_1 = require("./redis");
const migration_1 = require("./db/migration");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/chat", chat_1.default);
const PORT = process.env.PORT || 5000;
async function startServer() {
    try {
        // Run DB migrations
        await (0, migration_1.runMigrations)();
        console.log("✅ Migrations completed");
        // Initialize Redis
        await (0, redis_1.initRedis)();
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    }
    catch (err) {
        console.error("❌ Failed to start server:", err);
        process.exit(1);
    }
}
startServer();
