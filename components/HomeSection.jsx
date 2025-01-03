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
import PlayType from "./PlayType";

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

const winnerChecker = (
  tiles,
  setWinner,
  setGameOver,
  setPlayerXScore,
  setPlayerOScore,
  setSrikeClass,
  setMatchIndex
) => {
  for (const { combo, className, ...rest } of winningCombination) {
    const tileValue0 = tiles[combo[0]];
    const tileValue1 = tiles[combo[1]];
    const tileValue2 = tiles[combo[2]];

    if (
      tileValue0 !== null &&
      tileValue0 === tileValue1 &&
      tileValue1 === tileValue2
    ) {
      console.log(
        tileValue0,
        combo[0],
        tileValue1,
        combo[1],
        tileValue2,
        combo[2]
      );
      setMatchIndex([combo[0], combo[1], combo[2]]);
      setSrikeClass({ class: className, ...rest });
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
    winnerChecker(
      tiles,
      setWinner,
      setGameOver,
      setPlayerXScore,
      setPlayerOScore,
      setSrikeClass,
      setMatchIndex
    );
  }, [tiles]);

  // showing the result

  useEffect(() => {
    if (gameOver) {
      setShowResult(false); // Ensure it's hidden initially
      const timer = setTimeout(() => setShowResult(true), draw ? 500 : 1200); // Delay visibility by 2 seconds
      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [gameOver, draw]);

  const handleResetGame = () => {
    setResetGame(!resetGame);
    setTiles(Array(9).fill(null));
    setSelectPlayer("X");
    setGameOver(false);
    setStart(false);
    setWinner(null);
    setDraw(false);
    setShowResult(false); // Reset visibility
    setSrikeClass({ class: null, width: 0, height: 0 });
  };

  const handleSelectPlayer = () => {
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

        <Card
          className={cn(
            "border relative min-h-[216px] rounded-md py-5 px-10 w-[450px] space-y-6",
            { "flex items-center justify-center flex-col": !newGame }
          )}
        >
          {newGame && <PlayType />}

          {!newGame && (
            <div className="">
              <Button onClick={setNewGame}>New Game</Button>
            </div>
          )}

          {newGame && (
            <>
              <div className="text-center w-full space-y-4 border-b pb-2">
                <div className="flex items-center w-full gap-4">
                  <div
                    onClick={() => (start ? "" : handleSelectPlayer())}
                    className={cn(
                      "flex-grow border rounded-md px-4 py-1.5 flex items-center justify-between cursor-pointer",
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
                      "flex-grow border rounded-md px-4 py-1.5 flex items-center justify-between cursor-pointer",
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
                  setStart={setStart}
                  gameOver={gameOver}
                  setTiles={setTiles}
                  tiles={tiles}
                  selectPlayer={selectPlayer}
                  handlePlayer={handleSelectPlayer}
                  strikeClass={strikeClass}
                />
              )}
              <div className="flex justify-center">
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
        </Card>
      </div>
    </>
  );
};

export default HomeSection;
