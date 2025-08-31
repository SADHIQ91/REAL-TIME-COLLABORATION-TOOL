const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 3000;

// Serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("✅ A user connected");

  socket.on("text-change", (data) => {
    // broadcast text to all other users
    socket.broadcast.emit("text-change", data);
  });

  socket.on("disconnect", () => {
    console.log("❌ A user disconnected");
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});