// socket-server.js
const { Server } = require("socket.io");
const cors = require("cors");

const io = new Server(3001, {
  cors: {
    origin: "http://localhost:3000", // Next.js app URL
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Example: Listen for widget updates from the Editor
  socket.on("update_widget", (data) => {
    console.log("Widget updated:", data);
    // Broadcast to the OBS Overlay
    io.emit("widget_updated", data); 
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

console.log("Socket.io server running on http://localhost:3001");