"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const conversationService_1 = require("../services/conversationService");
const llmService_1 = require("../services/llmService");
const router = (0, express_1.Router)();
router.post('/message', async (req, res) => {
    try {
        const { message, sessionId } = req.body;
        if (!message || message.trim().length === 0)
            return res.status(400).json({ error: 'Message cannot be empty' });
        const conversationId = sessionId || await (0, conversationService_1.createConversation)();
        // Save user message
        await (0, conversationService_1.saveMessage)(conversationId, 'user', message);
        // Fetch history
        const history = await (0, conversationService_1.getConversationMessages)(conversationId);
        // Generate AI reply
        const reply = await (0, llmService_1.generateReply)(history, message);
        // Save AI reply
        await (0, conversationService_1.saveMessage)(conversationId, 'ai', reply);
        res.json({ reply, sessionId: conversationId });
    }
    catch (err) {
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
        const messages = await (0, conversationService_1.getConversationMessages)(sessionId);
        res.json({
            sessionId,
            messages: messages.map((m) => ({
                sender: m.sender,
                text: m.text,
            })),
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch conversation history' });
    }
});
exports.default = router;
