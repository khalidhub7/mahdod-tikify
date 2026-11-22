"use client";

import { useEffect } from "react";
import type { Overlay } from "@/types";

/*
src/components/overlay/OverlayClient.tsx
*/

type Props = { overlay: Overlay; secret: string };

const OverlayClient = ({ overlay, secret }: Props) => {
  useEffect(() => {
    let attempts = 0;
    let stopped = false;
    let ws: WebSocket | null = null;
    let reconnectTimer: ReturnType<typeof setTimeout>;

    const connect = async () => {
      if (stopped) return;

      try {
        const res = await fetch("/api/euler-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ overlay_id: overlay.id, secret }),
        });

        if (!res.ok) throw new Error((await res.json()).error);

        const { jwtKey } = await res.json();

        if (stopped) return;

        // setup WebSocket
        const params = new URLSearchParams({
          uniqueId: overlay.tiktok_username,
          jwtKey,
        });
        ws = new WebSocket(`wss://ws.eulerstream.com/?${params.toString()}`);

        ws.onopen = () => {
          attempts = 0;
        };

        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);

          // TODO: Distribute events to widgets.
        };

        ws.onerror = () => {
          ws?.close();
        };

        ws.onclose = () => {
          if (stopped) return;

          const delay = Math.min(1000 * 2 ** attempts, 30000);
          attempts++;
          reconnectTimer = setTimeout(connect, delay);
        };
      } catch {
        if (stopped) return;

        const delay = Math.min(1000 * 2 ** attempts, 30000);
        attempts++;

        reconnectTimer = setTimeout(connect, delay);
      }
    };

    connect();

    return () => {
      stopped = true;
      clearTimeout(reconnectTimer);
      ws?.close();
    };
  }, [overlay.id, secret]);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {overlay.widgets.map((widget) => (
        <div
          key={widget.id}
          style={{
            position: "absolute",
            left: widget.x,
            top: widget.y,
            width: widget.w,
            height: widget.h,
          }}
        >
          {/* Render widget based on widget.component */}
          <div>{widget.component}</div>
        </div>
      ))}
    </div>
  );
};

export { OverlayClient };
