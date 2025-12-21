import { v4 as uuidv4 } from 'uuid';
import { query } from '../db/client';
import { Message } from '../models/message';

export async function createConversation() {
  const id = uuidv4();
  await query('INSERT INTO conversations(id) VALUES($1)', [id]);
  return id;
}

export async function saveMessage(conversationId: string, sender: 'user'|'ai', text: string) {
  const id = uuidv4();
  await query(
    'INSERT INTO messages(id, conversation_id, sender, text) VALUES($1,$2,$3,$4)',
    [id, conversationId, sender, text]
  );
  return id;
}

export async function getConversationMessages(conversationId: string): Promise<Message[]> {
  const res = await query('SELECT * FROM messages WHERE conversation_id=$1 ORDER BY timestamp ASC', [conversationId]);
  return res.rows.map((r: any) => ({
    id: r.id,
    conversationId: r.conversation_id,
    sender: r.sender,
    text: r.text,
    timestamp: r.timestamp
  }));
}
