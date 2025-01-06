"use client";
import React, { useEffect, useState } from "react";
import { cn, handleResetGame, winnerChecker } from "@/lib/utils";
import { Card } from "../ui/card";
import PlayType from "../PlayType";
import { Button } from "../ui/button";
import Players from "../Players";
import GameStatus from "../GameStatus";
import Winner from "../Winner";
import Draw from "../Draw";
import GameBoard from "../GameBoard";
import { useParams } from "next/navigation";
import { createClientSocket } from "@/lib/socket";

export const winningCombination = [
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

const GameSection = () => {
  const params = useParams();
  const [newGame, setNewGame] = useState(false);
  const [resetGame, setResetGame] = useState(false);
  const [player, setPlayer] = useState('');
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [start, setStart] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [draw, setDraw] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [strikeClass, setSrikeClass] = useState({
    class: null,
    width: 0,
    height: 0,
  });
  const [matchIndex, setMatchIndex] = useState([]);
  const [firstSelect, setFirstSelect] = useState("");
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [turn, setTurn] = useState("X"); // Current turn

  const [socket, setSocket] = useState(null);


  // useEffect(() => {
  //   // Check for a winner every time the tiles change useEffect(() => {
  //   winnerChecker({
  //     winningCombination,
  //     tiles,
  //     setWinner,
  //     setGameOver,
  //     setSrikeClass,
  //     setMatchIndex,
  //   });
  // }, [tiles]);

  // showing the result

  useEffect(() => {
    if (gameOver) {
      setShowResult(false); // Ensure it's hidden initially
      const timer = setTimeout(() => setShowResult(true), draw ? 500 : 1200); // Delay visibility by 2 seconds
      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [gameOver, draw]);

  const handleReset = () => {
    socket.emit("resetGame", !resetGame);
  };

  // const socketClient = () => {
  //   fetch("/api/socketio").finally(() => {
  //     if (socket !== null) {
  //       console.log({ connected: socket.connected });
  //     } else {
  //       const newSocket = io({
  //         transports: ["websocket"],
  //         path: "/api/socketio",
  //       });

  //       newSocket.emit("join_game", params?.invitedId);

  //       newSocket.on("connect", () => {
  //         console.log("Established ws connected to io server", newSocket.id);
  //       });

  //       newSocket.on("newGame", (payload) => {
  //         console.log(payload)
  //         setNewGame(payload.value);
  //       });

  //       newSocket.on("setPlayer", (payload) => {
  //         setPlayer(payload);
  //       });
  //       newSocket.on("setFirstSelect", (payload) => {
  //         setFirstSelect(payload);
  //       });

  //       newSocket.on("setTiles", (payload) => {
  //         setTiles(payload);
  //       });

  //       newSocket.on("setStart", (payload) => {
  //         setStart(payload);
  //       });

  //       newSocket.on("resetGame", (payload) => {
  //         handleResetGame({
  //           setResetGame,
  //           resetGame,
  //           setTiles,
  //           setPlayer,
  //           setGameOver,
  //           setStart,
  //           setWinner,
  //           setDraw,
  //           setShowResult,
  //           setSrikeClass,
  //         });
  //       });

  //       newSocket.on("disconnect", (reason) => {
  //         if (
  //           !["io client disconnect", "io server disconnect"].includes(reason)
  //         ) {
  //           console.error(
  //             "Socket connection closed due to: ",
  //             reason,
  //             "socket: ",
  //             socket
  //           );
  //         }
  //       });

  //       setSocket(newSocket);
  //     }
  //   });
  // };

  // useEffect(() => {
  //   socketClient();
  //   return () => {
  //     socket?.disconnect();
  //   };
  // }, [socket]);

  useEffect(() => {
    if (params?.invitedId) {
      fetch("/api/socketio").finally(() => {
        if (socket !== null) {
          // setConnected(socket.connected)
        } else {
          const newSocket = createClientSocket(params?.invitedId);
          newSocket.on("connect", () => {
            // setConnected(true)
            console.log("connected");
          });
          newSocket.on("newGame", (payload) => {
            setNewGame(payload);
          });

          newSocket.on("player_assigned", ({ player, board }) => {
            console.log({player, board})
            setPlayer(player);
            setTiles(board);
          });

          newSocket.on("players_updated", ({ players, turn }) => {
            setTurn(turn);
          });

          newSocket.on("update_board", ({board, turn}) => {
            setTurn(turn);
            setTiles(board)
          })

          newSocket.on("game_over", (gameOver, winner, scores) => {
            setWinner(winner)
            setGameOver(gameOver)
            setScores(scores)
          })

          // newSocket.on("setPlayer", (payload) => {
          //   setPlayer(payload);
          // });
          newSocket.on("setFirstSelect", (payload) => {
            setFirstSelect(payload);
          });

          newSocket.on("setTiles", (payload) => {
            setTiles(payload);
          });

          newSocket.on("setStart", (payload) => {
            setStart(payload);
          });

          newSocket.on("resetGame", (payload) => {
            handleResetGame({
              setResetGame,
              resetGame,
              setTiles,
              setPlayer,
              setGameOver,
              setStart,
              setWinner,
              setDraw,
              setShowResult,
              setSrikeClass,
            });
          });

          setSocket(newSocket);
        }
      });
    }

    return () => {
      if (socket !== null) {
        socket.disconnect();
      }
    };
  }, [params?.invitedId, socket]);

  const handleSelectPlayer = (select) => {
    if (!start) {
      socket.emit("setPlayer", { value: select });
      socket.emit("firstSelect", select);
      socket.emit("setFirstSelect", select === "X" ? "O" : "X");
      return;
    }
    return;
  };

  console.log({turn: turn, player})

  return (
    <>
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-4xl font-semibold ">Tic Tac Toe</h1>

        <Card
          className={cn(
            "border relative min-h-[216px] rounded-md py-5 px-10 w-[450px] space-y-6",
            { "flex items-center justify-center flex-col": !newGame }
          )}
        >
          {newGame && <PlayType />}

          {!newGame && (
            <div className="">
              <Button
                onClick={() => {
                  socket?.emit("newGame", true);
                }}
              >
                Start Game
              </Button>
            </div>
          )}

          {newGame && (
            <>
              <div className="text-center w-full space-y-4 border-b pb-2">
                <Players
                  playerOScore={scores['O']}
                  playerXScore={scores['X']}
                  player={turn}
                  handlePlayer={handleSelectPlayer}
                />
                <GameStatus
                  placeholder={"Select player"}
                  gameOver={gameOver}
                  start={start}
                  player={turn}
                  socket={socket}
                />
              </div>

              {gameOver && showResult && winner ? (
                <Winner winner={winner} resetGame={handleReset} />
              ) : gameOver && showResult && draw ? (
                <Draw resetGame={handleReset} />
              ) : (
                <GameBoard
                  firstSelect={firstSelect}
                  key={resetGame}
                  setDraw={setDraw}
                  setGameOver={setGameOver}
                  setStart={setStart}
                  gameOver={gameOver}
                  setTiles={setTiles}
                  tiles={tiles}
                  player={player}
                  turn={turn}
                  strikeClass={strikeClass}
                  setPlayer={setPlayer}
                  socket={socket}
                />
              )}
              <div className="flex justify-center">
                <Button
                  onClick={handleReset}
                  variant={"ghost"}
                  className="text-muted-foreground"
                >
                  Restart game
                </Button>
              </div>
            </>
          )}
        </Card>
      </div>
    </>
  );
};

export default GameSection;
