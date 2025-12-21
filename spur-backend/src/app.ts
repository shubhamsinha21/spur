import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import chatRouter from './routes/chat';
import { createClient } from 'redis';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/chat', chatRouter);

const PORT = process.env.PORT || 5000;

// Redis client (optional)
const redisClient = createClient({ url: process.env.REDIS_URL });
redisClient.connect().then(() => console.log('Redis connected')).catch(console.error);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
