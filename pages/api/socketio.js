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

      socket.on("message", (data) => {
        console.log("message: ", data);
        io.emit("message", data)
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
