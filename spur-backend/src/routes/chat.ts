import { Router } from "express";
import {
  createConversation,
  saveMessage,
  getConversationMessages,
} from "../services/conversationService";
import { generateReply } from "../services/llmService";

const router = Router();

/**
 * POST /chat/message
 */
router.post("/message", async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: "Message cannot be empty" });
    }

    const conversationId = sessionId || (await createConversation());

    // Save user message
    await saveMessage(conversationId, "user", message);

    // Fetch full history (includes latest user msg)
    const history = await getConversationMessages(conversationId);

    // Generate AI reply using history ONLY
    const reply = await generateReply(history, message);

    // Save AI reply
    await saveMessage(conversationId, "ai", reply);

    res.json({
      reply,
      sessionId: conversationId,
    });
  } catch (err) {
    console.error("Chat message error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

/**
 * GET /chat/history/:sessionId
 */
router.get("/history/:sessionId", async (req, res) => {
  const { sessionId } = req.params;

  try {
    const messages = await getConversationMessages(sessionId);

    return res.json({
      messages: messages.map((m) => ({
        sender: m.sender,
        text: m.text,
      })),
    });
  } catch (err) {
    console.error("Failed to fetch chat history:", err);
    res.status(500).json({
      error: "Failed to load chat history",
    });
  }
});

export default router;
