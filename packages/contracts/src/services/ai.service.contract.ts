/**
 * AI Services Contracts
 *
 * Interfacce per servizi AI (config, chat, intent-detection, etc.)
 * UNICA FONTE DI VERITÀ per i contratti dei servizi AI
 */

import type { Message, Conversation, ParsedAiResponse, RequestType } from '@giulio-leone/types';

/**
 * Chat Service Contract
 */
export interface IChatService {
  createConversation(title?: string): Conversation;
  getConversation(id: string): Conversation | null;
  getAllConversations(): Conversation[];
  addMessage(conversationId: string, message: Omit<Message, 'id' | 'timestamp'>): Message | null;
  deleteConversation(id: string): boolean;
  parseAiResponse<T>(response: string, type: RequestType): ParsedAiResponse<T>;
}
