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
import { io } from "socket.io-client";

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
  const [newGame, setNewGame] = useState(false);
  const [resetGame, setResetGame] = useState(false);
  const [player, setPlayer] = useState("X");
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

  const [playerXScore, setPlayerXScore] = useState(0);
  const [playerOScore, setPlayerOScore] = useState(0);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Check for a winner every time the tiles change useEffect(() => {
    winnerChecker({
      winningCombination,
      tiles,
      setWinner,
      setGameOver,
      setPlayerXScore,
      setPlayerOScore,
      setSrikeClass,
      setMatchIndex,
    });
  }, [tiles]);

  // showing the result

  useEffect(() => {
    if (gameOver) {
      setShowResult(false); // Ensure it's hidden initially
      const timer = setTimeout(() => setShowResult(true), draw ? 500 : 1200); // Delay visibility by 2 seconds
      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [gameOver, draw]);

  const handleReset = () => {
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
  };

  const socketClient = () => {
    fetch("/api/socketio").finally(() => {
      if (socket !== null) {
        console.log({ connected: socket.connected });
      } else {
        const newSocket = io({
          transports: ["websocket"],
          path: "/api/socketio",
        });
        newSocket.on("connect", () => {
          console.log("Established ws connected to io server", newSocket.id);
        });
        newSocket.on("disconnect", (reason) => {
          if (
            !["io client disconnect", "io server disconnect"].includes(reason)
          ) {
            console.error(
              "Socket connection closed due to: ",
              reason,
              "socket: ",
              socket
            );
          }
        });

        setSocket(newSocket);
      }
    });
  };

  useEffect(() => {
    socketClient();
    return () => {
      socket?.disconnect();
    };
  }, [socket]);


  console.log(socket)



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
              <Button onClick={() => {
                socket?.emit("message", true)
              }}>Start Game</Button>
            </div>
          )}

          {newGame && (
            <>
              <div className="text-center w-full space-y-4 border-b pb-2">
                <Players
                  start={start}
                  playerOScore={playerOScore}
                  playerXScore={playerXScore}
                  player={player}
                  setPlayer={setPlayer}
                />
                <GameStatus gameOver={gameOver} start={start} player={player} />
              </div>

              {gameOver && showResult && winner ? (
                <Winner winner={winner} resetGame={handleResetGame} />
              ) : gameOver && showResult && draw ? (
                <Draw resetGame={handleResetGame} />
              ) : (
                <GameBoard
                  key={resetGame}
                  setDraw={setDraw}
                  setGameOver={setGameOver}
                  setStart={setStart}
                  gameOver={gameOver}
                  setTiles={setTiles}
                  tiles={tiles}
                  player={player}
                  strikeClass={strikeClass}
                  setPlayer={setPlayer}
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
