export interface StoredMessage {
  sender: "user" | "ai";
  text: string;
}

const chatStore = new Map<string, StoredMessage[]>();

export function getMessages(sessionId: string): StoredMessage[] {
  return chatStore.get(sessionId) || [];
}

export function addMessage(sessionId: string, message: StoredMessage) {
  const existing = chatStore.get(sessionId) || [];
  chatStore.set(sessionId, [...existing, message]);
}
