// import "server-only";

import WebSocket from "ws";
import EulerStreamApiClient from "@eulerstream/euler-api-sdk";
import type { WebcastEvent } from "@eulerstream/euler-websocket-sdk";

const EULER_WS_URL = "wss://ws.eulerstream.com";
const API_KEY = process.env.EULER_STREAM_API_KEY;
const ACCOUNT_ID = process.env.EULER_STREAM_ACCOUNT_ID;

const createEulerJwt = async (uniqueId: string) => {
  if (!API_KEY || !ACCOUNT_ID) {
    throw new Error("Missing Euler credentials");
  }
  const client = new EulerStreamApiClient({ apiKey: API_KEY });

  // Best Practice:
  // Short lifetime + restrict to one creator/connection
  const response = await client.authentication.createJWT(Number(ACCOUNT_ID), {
    expireAfter: 60, // 60 seconds is recommended
    websockets: {
      allowedCreators: [uniqueId],
      maxWebSockets: 1,
    },
  });
  return response.data.token;
};

const connectToLive = (
  uniqueId: string,
  auth: { jwtKey: string } | { apiKey: string },
) => {
  const params = new URLSearchParams({ uniqueId });

  // Best Practice: Frontend uses jwtKey, Backend uses apiKey

  if ("jwtKey" in auth) params.append("jwtKey", auth.jwtKey);
  else params.append("apiKey", auth.apiKey);

  const ws = new WebSocket(`${EULER_WS_URL}?${params.toString()}`);

  ws.on("open", () => console.log("[WebSocket] Connected"));
  ws.on("close", (code) => {
    switch (code) {
      case 1000:
        console.log("[WebSocket] Closed normally");
        break;
      case 4401:
        console.error("[WebSocket] Auth failed (Invalid JWT)");
        break;
      case 4404:
        console.log("[WebSocket] Streamer is offline");
        break;
      case 4429:
        console.warn("[WebSocket] Too many connections");
        break;
      case 4555:
        console.log("[WebSocket] Max lifetime (8h) exceeded");
        break;
      default:
        console.log(`[WebSocket] Closed unexpectedly. Code: ${code}`);
    }
  });
  ws.on("error", (e) => console.error("[WebSocket] Error:", e.message));

  return ws;
};

/* // test
const testComments = async (uniqueId: string) => {
  const jwtKey = (await createEulerJwt(uniqueId)) as string;
  const ws = connectToLive(uniqueId, { jwtKey });

  ws.on("message", (raw) => {
    try {
      const data = JSON.parse(raw.toString());
      const { messages } = data;
      for (const msg of messages) {
        if (msg.type === "WebcastChatMessage") {
          console.log(`[Chat] ${msg.data.user.nickname}: ${msg.data.comment}`);
        }
      }
    } catch {}
  });
};

testComments("hydrogen_yt1"); */

export { createEulerJwt, connectToLive };
