"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChatHistory = getChatHistory;
async function getChatHistory(req, res) {
    const { sessionId } = req.params;
    if (!sessionId) {
        return res.status(400).json({ error: "Session ID required" });
    }
    try {
        const messages = await Message.findAll({
            where: { conversationId: sessionId },
            order: [["createdAt", "ASC"]],
        });
        return res.json({
            sessionId,
            messages: messages.map((m) => ({
                sender: m.sender,
                text: m.text,
            })),
        });
    }
    catch (error) {
        console.error("Error fetching history:", error);
        return res.status(500).json({ error: "Failed to load chat history" });
    }
}
