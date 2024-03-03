import { create } from "zustand";
import { message, lastestMessage } from "../models/message";
import Conversation from "../models/conversation";

interface ConversationState {
  selectedConversation: Conversation | null;
  setSelectedConversation: (selectedConversation: Conversation | null) => void;
  messages: message[];
  setMessages: (messages: message[]) => void;
  latestMessage: lastestMessage | string;
  setLatestMessage: (latestMessage: lastestMessage | string) => void;
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  latestMessage: "",
  setLatestMessage: (latestMessage) => set({ latestMessage }),
}));

export default useConversation;
