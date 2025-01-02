"use client";
import React, { useEffect, useState } from "react";
import GameBoard from "./GameBoard";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Circle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Winner from "./Winner";
import Draw from "./Draw";
import { motion } from "motion/react";

const winningCombination = [
  { combo: [0, 1, 2], className: "top-1/6 left-0 w-full h-1" }, // Top row
  { combo: [3, 4, 5], className: "top-1/2 left-0 w-full h-1" }, // Middle row
  { combo: [6, 7, 8], className: "top-5/6 left-0 w-full h-1" }, // Bottom row
  { combo: [0, 3, 6], className: "top-0 left-1/6 h-full w-1" }, // Left column
  { combo: [1, 4, 7], className: "top-0 left-1/2 h-full w-1" }, // Middle column
  { combo: [2, 5, 8], className: "top-0 left-5/6 h-full w-1" }, // Right column
  {
    combo: [0, 4, 8],
    className: "top-0 left-0 w-full h-1 rotate-45 origin-top-left",
  }, // Top-left to bottom-right diagonal
  {
    combo: [2, 4, 6],
    className: "top-0 left-0 w-full h-1 -rotate-45 origin-top-right",
  }, // Top-right to bottom-left diagonal
];

const winnerChecker = (
  tiles,
  setWinner,
  setGameOver,
  setPlayerXScore,
  setPlayerOScore,
  setSrikeClass,
) => {
  for (const { combo, className } of winningCombination) {
    const tileValue0 = tiles[combo[0]];
    const tileValue1 = tiles[combo[1]];
    const tileValue2 = tiles[combo[2]];


    if (
      tileValue0 !== null &&
      tileValue0 === tileValue1 &&
      tileValue1 === tileValue2
    ) {
      setSrikeClass(className)
      setGameOver(true);
      setWinner(tileValue0);
      if (tileValue0 === "X") {
        setPlayerXScore((prev) => prev + 1);
      } else {
        setPlayerOScore((prev) => prev + 1);
      }
      return;
    }
  }
};

const HomeSection = () => {
  const [newGame, setNewGame] = useState(false);
  const [resetGame, setResetGame] = useState(false);
  const [selectPlayer, setSelectPlayer] = useState("X");
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [start, setStart] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [draw, setDraw] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [strikeClass, setSrikeClass] = useState(null);

  const [playerXScore, setPlayerXScore] = useState(0);
  const [playerOScore, setPlayerOScore] = useState(0);

  useEffect(() => {
    // Check for a winner every time the tiles change useEffect(() => {
    winnerChecker(
      tiles,
      setWinner,
      setGameOver,
      setPlayerXScore,
      setPlayerOScore,
      setSrikeClass
    );
  }, [tiles]);

  // useEffect(() => {
  //   if (gameOver) {
  //     setShowResult(false); // Ensure it's hidden initially
  //     const timer = setTimeout(() => setShowResult(true), 2000); // Delay visibility by 2 seconds
  //     return () => clearTimeout(timer); // Cleanup timer on unmount
  //   }
  // }, [gameOver]);

  const handleNewGame = () => {
    setNewGame(true);
  };

  const handleResetGame = () => {
    setResetGame(!resetGame);
    setTiles(Array(9).fill(null));
    setSelectPlayer("X");
    setGameOver(false);
    setStart(false);
    setWinner(null);
    setDraw(false);
    setShowResult(false); // Reset visibility
    setSrikeClass(null)
  };

  const handleSelectPlayer = () => {
    setStart(true);
    if (selectPlayer === "X") {
      setSelectPlayer("O");
      return;
    } else {
      setSelectPlayer("X");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-4xl font-semibold ">Tic Tac Toe</h1>

        <Card className="border relative min-h-[216px] rounded-md p-10 w-[450px] flex items-center justify-center flex-col space-y-6">
          {newGame && (
            <>
              <div className="text-center w-full space-y-4 border-b pb-2">
                <div className="flex items-center w-full gap-4">
                  <div
                    onClick={() => (start ? "" : handleSelectPlayer())}
                    className={cn(
                      "flex-grow border rounded-md px-4 py-2 flex items-center justify-between cursor-pointer",
                      { "border-b-primary border-b-4 ": selectPlayer === "X" }
                    )}
                  >
                    <X className="size-5" />
                    <span className="text-xl text-gray-400 font-semibold">
                      {playerXScore ? playerXScore : "-"}
                    </span>
                  </div>
                  <div
                    onClick={() => (start ? "" : handleSelectPlayer())}
                    className={cn(
                      "flex-grow border rounded-md px-4 py-2 flex items-center justify-between cursor-pointer",
                      { "border-b-primary  border-b-4 ": selectPlayer === "O" }
                    )}
                  >
                    <Circle className="size-5" />
                    <span className="text-xl text-gray-400 font-semibold">
                      {playerOScore ? playerOScore : "-"}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  {gameOver ? (
                    "Game over"
                  ) : start ? (
                    <>
                      <span className="text-primary font-semibold">
                        {selectPlayer}
                      </span>{" "}
                      Turn
                    </>
                  ) : (
                    <motion.span
                      initial={{ opacity: 0, translateY: 4 }}
                      animate={{ opacity: 1, translateY: 0 }}
                      transition={{
                        duration: 0.8,
                        ease: "easeInOut",
                      }}
                    >
                      Start game or select player
                    </motion.span>
                  )}
                </p>
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
                  gameOver={gameOver}
                  setTiles={setTiles}
                  tiles={tiles}
                  selectPlayer={selectPlayer}
                  handlePlayer={handleSelectPlayer}
                  strikeClass={strikeClass}
                 
                />
              )}
              <div>
                <Button
                  onClick={handleResetGame}
                  variant={"ghost"}
                  className="text-muted-foreground"
                >
                  Restart game
                </Button>
              </div>
            </>
          )}
          {!newGame && <Button onClick={setNewGame}>New Game</Button>}
        </Card>
      </div>
    </>
  );
};

export default HomeSection;
