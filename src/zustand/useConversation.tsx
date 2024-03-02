import { create } from "zustand";
import { message, lastestMessage } from "../models/message";

interface ConversationState {
  selectedConversation: string;
  setSelectedConversation: (selectedConversation: string) => void;
  messages: message[];
  setMessages: (messages: message[]) => void;
  latestMessage: lastestMessage | "";
  setLatestMessage: (latestMessage: lastestMessage) => void;
}

// const useConversation = create<ConversationState>((set) => ({
//   selectedConversation: "",
//   setSelectedConversation: (selectedConversation) =>
//     set({ selectedConversation }),
//   messages: [],
//   setMessages: (messages) => set({ messages }),
//   lastestMesssage: "",
//   setLastestMessage: (lastestMesssage) => set({ lastestMesssage }),
// }));

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: "",
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  latestMessage: "",
  setLatestMessage: (latestMessage) => set({ latestMessage }),
}));

export default useConversation;
