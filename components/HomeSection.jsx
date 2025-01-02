"use client"
import React, { useState } from "react";
import GameBoard from "./GameBoard";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const HomeSection = () => {
  const [newGame, setNewGame] = useState(false);
  const [resetGame, setResetGame] = useState(false);

  const handleNewGame = () => {
    setNewGame(true);
  };

  const handleResetGame = () => {
    setResetGame(true);
  };

  return (
    <>
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-4xl font-semibold ">Tic Tac Toe</h1>
        
        <Card className="border rounded-md p-10 h-[450px] w-[450px] flex items-center justify-center flex-col">
        {newGame && <GameBoard />}
        {!newGame && <Button onClick={setNewGame}>New Game</Button>}
        </Card>
      </div>
    </>
  );
};

export default HomeSection;
