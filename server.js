const WebSocket = require("ws");
const server = new WebSocket.Server({ port: 8080 });

const clients = [];

server.on("connection", (socket) => {
  clients.push(socket);

  socket.on("message", (message) => {
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(String(message));
      }
    });
  });

  socket.on("close", () => {
    clients.splice(clients.indexOf(socket), 1);
  });
});

console.log("WebSocket server is running on ws://localhost:8080");
