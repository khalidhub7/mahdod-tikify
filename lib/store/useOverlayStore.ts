import { create } from "zustand";

interface OverlayState {
  chats: any[];
  gifts: any[];
  addChat: (msg: any) => void;
  addGift: (gift: any) => void;
}

export const useOverlayStore = create<OverlayState>((set) => ({
  chats: [],
  gifts: [],
  addChat: (msg) =>
    set((state) => ({ chats: [...state.chats, msg].slice(-50) })), // Keep last 50
  addGift: (gift) =>
    set((state) => ({ gifts: [...state.gifts, gift].slice(-20) })),
}));
