// test-tiktok.js

import { TikTokLiveConnection } from "tiktok-live-connector";

const tiktokUsername = "flambo32";

console.log(`Connecting to @${tiktokUsername}...`);

const options = {
  // Randomize this
  userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36...",
  // Random 19-digit number
  deviceId: Math.floor(Math.random() * 1000000000000000000).toString(),
  // proxy: { host: "1.2.3.4", port: 8080 } // Best to rotate IPs too
};

const tiktokConnection = new TikTokLiveConnection(tiktokUsername, options);

tiktokConnection
  .connect()
  .then((state) => {
    console.log(`✅ Connected! Room ID: ${state.roomId}`);
  })
  .catch((err) => {
    console.error("❌ Failed to connect:", err);
  });

tiktokConnection.on("chat", (data) => {
  /* console.log(`💬 ${data.uniqueId}: ${data.comment}`); */
  console.log(data.user.nickname, ":", data.content);
});

/* tiktokConnection.on("gift", (data) => {
  console.log(`🎁 ${data.uniqueId} sent ${data.giftName} x${data.repeatCount}`);
}); */
