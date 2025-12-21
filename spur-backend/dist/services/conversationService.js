"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConversation = createConversation;
exports.saveMessage = saveMessage;
exports.getConversationMessages = getConversationMessages;
const uuid_1 = require("uuid");
const client_1 = require("../db/client");
async function createConversation() {
    const id = (0, uuid_1.v4)();
    await (0, client_1.query)('INSERT INTO conversations(id) VALUES($1)', [id]);
    return id;
}
async function saveMessage(conversationId, sender, text) {
    const id = (0, uuid_1.v4)();
    await (0, client_1.query)('INSERT INTO messages(id, conversation_id, sender, text) VALUES($1,$2,$3,$4)', [id, conversationId, sender, text]);
    return id;
}
async function getConversationMessages(conversationId) {
    const res = await (0, client_1.query)('SELECT * FROM messages WHERE conversation_id=$1 ORDER BY timestamp ASC', [conversationId]);
    return res.rows.map((r) => ({
        id: r.id,
        conversationId: r.conversation_id,
        sender: r.sender,
        text: r.text,
        timestamp: r.timestamp
    }));
}
