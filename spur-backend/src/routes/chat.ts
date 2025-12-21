import { Router } from 'express';
import { createConversation, saveMessage, getConversationMessages } from '../services/conversationService';
import { generateReply } from '../services/llmService';

const router = Router();

router.post('/message', async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    if (!message || message.trim().length === 0) return res.status(400).json({ error: 'Message cannot be empty' });

    const conversationId = sessionId || await createConversation();

    // Save user message
    await saveMessage(conversationId, 'user', message);

    // Fetch history
    const history = await getConversationMessages(conversationId);

    // Generate AI reply
    const reply = await generateReply(history, message);

    // Save AI reply
    await saveMessage(conversationId, 'ai', reply);

    res.json({ reply, sessionId: conversationId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.get('/history/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;

    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID is required' });
    }

    const messages = await getConversationMessages(sessionId);

    res.json({
      sessionId,
      messages: messages.map((m) => ({
        sender: m.sender,
        text: m.text,
      })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch conversation history' });
  }
});


export default router;
