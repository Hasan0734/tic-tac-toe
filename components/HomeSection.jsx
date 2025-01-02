"use client";
import React, { useState } from "react";
import GameBoard from "./GameBoard";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Circle, X } from "lucide-react";
import { cn } from "@/lib/utils";

const HomeSection = () => {
  const [newGame, setNewGame] = useState(false);
  const [resetGame, setResetGame] = useState(false);
  const [selectPlayer, setSelectPlayer] = useState("X");
  const [tiles, setTiles] = useState(Array(9).fill(null));

  const handleNewGame = () => {
    setNewGame(true);
  };

  const handleResetGame = () => {
    setResetGame(true);
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

        <Card className="border rounded-md p-10 w-[450px] flex items-center justify-center flex-col space-y-6">
          {newGame && (
            <>
              <div className="text-center w-full space-y-4 border-b pb-2">
                <div className="flex items-center w-full gap-4">
                  <div
                    onClick={handleSelectPlayer}
                    className={cn(
                      "flex-grow border rounded-md px-4 py-2 flex items-center justify-between cursor-pointer",
                      { "border-b-primary border-b-4 ": selectPlayer === "X" }
                    )}
                  >
                    <X className="size-6" />
                    <span className="text-xl text-gray-400 font-semibold">
                      1
                    </span>
                  </div>
                  <div
                    onClick={handleSelectPlayer}
                    className={cn(
                      "flex-grow border rounded-md px-4 py-2 flex items-center justify-between cursor-pointer",
                      { "border-b-primary  border-b-4 ": selectPlayer === "O" }
                    )}
                  >
                    <Circle className="size-6" />
                    <span className="text-xl text-gray-400 font-semibold">
                      -
                    </span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  Start game or select player
                </p>
              </div>
              <GameBoard
                tiles={tiles}
                selectPlayer={selectPlayer}
                handlePlayer={handleSelectPlayer}
              />
            </>
          )}
          {!newGame && <Button onClick={setNewGame}>New Game</Button>}
        </Card>
      </div>
    </>
  );
};

export default HomeSection;
