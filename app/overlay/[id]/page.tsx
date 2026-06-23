/* 
'use client';
// app/overlay/[id]/page.tsx
import { useSocket } from '@/hooks/useSocket';
import ChatWidget from '@/components/widgets/ChatWidget';
import GiftWidget from '@/components/widgets/GiftWidget';

export default function OverlayPage() {
  // Start the engine EXACTLY ONCE here
  useSocket('tiktok_username'); 

  return (
    <div className="w-full h-full bg-transparent">
      <ChatWidget />
      <GiftWidget />
    </div>
  );
} */