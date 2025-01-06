import { Server } from "socket.io";

export default function handler(req, res) {
  if (!res.socket.server.io) {
    console.log("Initializing Socket.IO server ...");

    const io = new Server(res.socket.server, {
      path: "/api/socketio",
    });
    //store the server instance to prevent re-initialization
    res.socket.server.io = io;

    const rooms = {};

    const broadcast = (roomId, event, payload) => {
      io.to(roomId).emit(event, payload);
    };

    io.on("connection", (socket) => {
      console.log("New Socket.IO connection");

      const roomId = socket.handshake.query.roomId.toLowerCase();

      if (roomId) {
        if (!rooms[roomId]) {
          rooms[roomId] = {
            players: [],
            board: Array(9).fill(null),
            turn: "X",
            scores: { X: 0, O: 0 },
          };
        }
      }

      const roomData = rooms[roomId];

      if (roomData.players.length < 2) {
        roomData.players.push(socket.id);
        socket.join(roomId);

        // assign the symbol
        const playerSymbol = roomData.players[0] === socket.id ? "X" : "O";

        io.to(roomId).emit("player_assigned", {
          player: playerSymbol,
          board: roomData.board,
          rooms
        });

        io.to(roomId).emit("player_update", {
          players: roomData.players,
          turn: roomData.turn,
        });
      } else {
        socket.emit("roomFull", { message: "Room is full" });
        socket.disconnect();
      }

      socket.on("newGame", (payload) => {
        broadcast(roomId, "newGame", payload);
      });

      socket.on("make_move", ({ roomId, i, player }) => {
        console.log({ roomId, i, player });

        const roomData = rooms[roomId];
        if (roomData && roomData.turn === player && !roomData.board[i]) {
          roomData.board[i] = player;
          roomData.turn = player === "X" ? "O" : "X";

          io.to(roomId).emit("update_board", {
            board: roomData.board,
            turn: roomData.turn,
          });

          const result = checkWinner(roomData.board);

          if (result.winner) {
            const { winner, className, ...rest } = result;

            roomData.scores[winner] += 1;
            // Game is over, send the winner to both players
            io.to(roomId).emit("game_over", {
              winner,
              gameOver: true,
              scores: roomData.scores,
              className,
              ...rest,
            });
          } else if (roomData.board.every((cell) => cell !== null)) {
            // Game is a draw
            io.to(roomId).emit("game_over", {
              winner: null,
              gameOver: true,
              scores: roomData.scores,
              draw: true,
            });
          }
        }
      });

      // socket.on("setPlayer", (payload) => {
      //   broadcast(roomId, "setPlayer", payload);
      // });

      // socket.on("setTiles", (payload) => {
      //   broadcast(roomId, "setTiles", payload);
      // });

      // socket.on("setStart", (payload) => {
      //   broadcast(roomId, "setStart", payload);
      // });

      // socket.on("firstSelect", (payload) => {
      //   broadcast(roomId, "firstSelect", payload);
      // });

      // socket.on("resetGame", (payload) => {
      //   broadcast(roomId, "resetGame", payload);
      // });

      socket.on("disconnect", () => {
        console.log("Socket.IO connecion closed", socket.id);

        for (const room in rooms) {
          const roomData = rooms[room];
          roomData.players = roomData.players.filter((id) => id !== socket.id);

          if (roomData.players.length === 0) {
            delete rooms[room];
          }
        }
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

function checkWinner(tiles) {
  const winningCombination = [
    {
      combo: [0, 1, 2],
      className: "top-[44px] left-[80px] h-1 right-0",
      width: "204px",
    }, // Top row
    {
      combo: [3, 4, 5],
      className: "top-[115px] left-[80px]  h-1 right-0",
      width: "204px",
    }, // Middle row
    {
      combo: [6, 7, 8],
      className: "top-[184px] left-[80px] h-1 right-0",
      width: "204px",
    }, // Bottom row
    {
      combo: [0, 3, 6],
      className: "top-[14px] left-[112px]  w-1",
      height: "204px",
    }, // Left column
    {
      combo: [1, 4, 7],
      className: "top-[14px] left-[182px] w-1",
      height: "204px",
    }, // Middle column
    {
      combo: [2, 5, 8],
      className: "top-[14px] right-[112px] w-1",
      height: "204px",
    }, // Right column
    {
      combo: [0, 4, 8],
      className: "top-4 left-[87px]  h-1 rotate-45 origin-top-left",
      width: "278px",
    }, // Top-left to bottom-right diagonal
    {
      combo: [2, 4, 6],
      className: " h-1 -rotate-45 top-[15px] right-[84px] origin-bottom-right",
      width: "278px",
    }, // Top-right to bottom-left diagonal
  ];

  for (const { combo, className, ...rest } of winningCombination) {
    const tileValue0 = tiles[combo[0]];
    const tileValue1 = tiles[combo[1]];
    const tileValue2 = tiles[combo[2]];

    if (
      tileValue0 !== null &&
      tileValue0 === tileValue1 &&
      tileValue1 === tileValue2
    ) {
      return { winner: tileValue0, className, ...rest };
    }
  }
}
