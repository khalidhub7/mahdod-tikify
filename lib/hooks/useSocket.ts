"use client";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useOverlayStore } from "@/lib/store/useOverlayStore";

const socket = io("http://localhost:4000"); // Connect to your backend

export function useSocket(tiktokUsername: string) {
  const { addChat, addGift } = useOverlayStore();

  useEffect(() => {
    // Tell server which TikTok stream to watch
    socket.emit("joinRoom", tiktokUsername);

    // Listen for events and update global state
    socket.on("chat", addChat);
    socket.on("gift", addGift);

    // Cleanup on unmount
    return () => {
      socket.off("chat", addChat);
      socket.off("gift", addGift);
    };
  }, [tiktokUsername, addChat, addGift]);
}
