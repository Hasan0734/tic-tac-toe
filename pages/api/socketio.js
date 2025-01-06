import { Server } from "socket.io";

export default function handler(req, res) {
  if (!res.socket.server.io) {
    console.log("Initializing Socket.IO server ...");

    const io = new Server(res.socket.server, {
      path: "/api/socketio",
    });
    //store the server instance to prevent re-initialization
    res.socket.server.io = io;

    const broadcast =  (roomId, event, payload) => {
      io.to(roomId).emit(event, payload);
    };

    io.on("connection", (socket) => {
      console.log("New Socket.IO connection");

      const roomId = socket.handshake.query.roomId.toLowerCase();

        console.log({roomId})

      socket.join(roomId);

      socket.on("newGame", (payload) => {
        broadcast(roomId, "newGame", payload);
      });

      socket.on("setPlayer", (payload) => {
        broadcast(roomId, "setPlayer", payload);
      });

      socket.on("setTiles", (payload) => {
        broadcast(roomId, "setTiles", payload);
      });

      socket.on("setStart", (payload) => {
        broadcast(roomId, "setStart", payload);
      });

      socket.on("firstSelect", (payload) => {
        broadcast(roomId, "firstSelect", payload);
      });

      socket.on("resetGame", (payload) => {
        broadcast(roomId, "resetGame", payload);
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
