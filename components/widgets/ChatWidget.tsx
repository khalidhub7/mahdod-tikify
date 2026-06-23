import { useOverlayStore } from '@/lib/store/useOverlayStore';

export default function ChatWidget() {
  const chats = useOverlayStore((state) => state.chats); // Reads global state

  return (
    <div className="bg-black/50 p-4 rounded text-white">
      {chats.map((msg, i) => <p key={i}>{msg.uniqueId}: {msg.comment}</p>)}
    </div>
  );
}