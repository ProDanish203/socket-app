import { Chat, User } from "@/types/types";
import { create } from "zustand";

interface ConversationState {
  selectedConversation: User | null;
  setSelectedConversation: (selectedConversation: User | null) => void;
  messages: Chat[];
  setMessages: (messages: Chat[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  loading: false,
  setLoading: (loading) => set({ loading }),
}));

export default useConversation;
