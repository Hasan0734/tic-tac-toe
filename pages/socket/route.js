import { Server } from "socket.io";

let io;

export async function GET(request) {
  if (!io) {
    // Create the Socket.IO server if not already created
    io = new Server({
      cors: {
        origin: "*", // Adjust for your domain in production
      },
    });

    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);

      socket.on("message", (data) => {
        console.log("Message received:", data);
        socket.emit("response", `Server received: ${data}`);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });

    // Attach the server to the response
    request.socket.server.io = io;
    console.log("Socket.IO server initialized");
  }

  // Respond to confirm the server is running
  return new Response("Socket.IO server is running!");
}
