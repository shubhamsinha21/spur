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
let redisClient: ReturnType<typeof createClient> | null = null;

if (process.env.REDIS_URL) {
  redisClient = createClient({ url: process.env.REDIS_URL });
  redisClient.on('error', (err) => console.error('Redis Client Error', err));
  redisClient.connect()
    .then(() => console.log('Redis connected'))
    .catch((err) => console.error('Redis connection failed:', err));
} else {
  console.log('No REDIS_URL provided, skipping Redis connection');
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export { redisClient }; // export in case chatRouter wants to use it
