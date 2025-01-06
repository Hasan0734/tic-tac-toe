import { io } from "socket.io-client"
import {  getPlayerId } from "./utils"

export function createClientSocket(roomId) {
    console.log("Trying to join room", roomId)
    const playerId = getPlayerId();
    const socket = io({
      query: {
        roomId,
        playerId
      },
      transports: ["websocket"],
      path: "/api/socketio",
    })
  
    socket.on("connect", () => {
      console.log("Established ws connection to io server", socket.id)
    })
  
    socket.on("disconnect", (reason) => {
      if (!["io client disconnect", "io server disconnect"].includes(reason)) {
        console.error(
          "Socket connection closed due to:",
          reason,
          "socket:",
          socket
        )
      }
    })
  
    return socket
  }
  