// server/index.js
import { Server } from "socket.io";
import { createServer } from "http";
import { TikTokLiveConnection } from "tiktok-live-connector";

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: { origin: "http://localhost:3000" },
});

io.on("connection", (socket) => {
  console.log(`Client with id: ${socket.id} connected`);

  socket.on("joinRoom", (username) => {
    const options = {
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
      deviceId: Math.floor(Math.random() * 1000000000000000000).toString(),
      // proxy: { host: "1.2.3.4", port: 8080 } // Add later if blocked
    };

    const tiktok = new TikTokLiveConnection(username, options);

    tiktok
      .connect()
      .then((state) => {
        console.log(`Connected to @${username} (${state.roomId})`);

        // Forward TikTok events to the OBS overlay
        tiktok.on("chat", (data) => io.emit("chat", data));
        tiktok.on("gift", (data) => io.emit("gift", data));
        tiktok.on("follow", (data) => io.emit("follow", data));
      })
      .catch((err) => {
        console.error(`Connection failed: @${username}`, err.message);
      });
  });
});

httpServer.listen(4000, () => console.log("Socket server on port 4000"));
