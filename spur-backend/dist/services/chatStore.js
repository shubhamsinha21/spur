"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessages = getMessages;
exports.addMessage = addMessage;
const chatStore = new Map();
function getMessages(sessionId) {
    return chatStore.get(sessionId) || [];
}
function addMessage(sessionId, message) {
    const existing = chatStore.get(sessionId) || [];
    chatStore.set(sessionId, [...existing, message]);
}
