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
import useWebSocketConnectionHook from "@/lib/hooks";

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

  useEffect(() => {
    // Check for a winner every time the tiles change useEffect(() => {
    winnerChecker({
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

  useWebSocketConnectionHook(() => {
    console.log("Me connected")
  }, "MESSAGE")

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
          {newGame && <PlayType/>}

          {!newGame && (
            <div className="">
              <Button onClick={setNewGame}>Start Game</Button>
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
