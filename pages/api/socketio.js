import { Server } from "socket.io";

export default function handler(req, res) {
  if (!res.socket.server.io) {
    console.log("Initializing Socket.IO server ...");

    const io = new Server(res.socket.server, {
      path: "/api/socketio",
    });

    //store the server instance to prevent re-initialization
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("New Socket.IO connection");

      socket.on("join_game", (room) => {
        socket.join(room);
      });

      socket.on("newGame", (data) => {
        io.to(data.room).emit("newGame", data);
      });

      socket.on("setPlayer", ({ room, payload }) => {
        io.emit("setPlayer", { room, payload });
      });

      socket.on("setTiles", ({ room, payload }) => {
        io.emit("setTiles", { room, payload });
      });

      socket.on("setStart", ({ room, payload }) => {
        io.emit("setStart", { room, payload });
      });

      socket.on("firstSelect", ({ room, payload }) => {
        io.emit("firstSelect", { room, payload });
      });

      socket.on("resetGame", ({ room, payload }) => {
        io.emit("resetGame", { room, payload });
      });

      socket.on("disconnect", () => {
        console.log("Socket.IO connecion closed");
      });
      socket.on("error", (error) => {
        console.log("Socket.IO error:", error);
      });

      io.on("upgrade", function (request, socket, head) {
        io.handlerUpgrade(request, socket, head, function (ws) {
          socket.emit("connection", ws, request);
        });
      });
    });
  } else {
    console.log("Socket.IO server already initialized");
  }

  //End the response to nsure the API route completes
  res.end();
}
