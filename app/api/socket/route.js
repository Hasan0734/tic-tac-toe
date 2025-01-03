import { Server } from "socket.io";

export default function handler(req, res) {
  if (res.socket.server.io) {
    res.end();
    return;
  }

  const io = new Server(res.socket.server);

  //Event handler for client connection
  io.on("connection", (socket) => {
    const clientId = socket.id;

    console.log("client connected ID: ", clientId);

    //event handler message

    socket.on("message", (data) => {
      console.log("Received message:", data);
    });

    //Event handler for client disconnection
    socket.on("disconnect", () => {
      console.log("Client disconnected:", clientId);
    });
  });

  // Monkey patching to access socket instance globally.
  global.io = io;

  //Attach the io instance to the server object
  res.socket.server.io = io;
  res.end();

  // Handle other routes or methods as needed
  res.send({});
}
