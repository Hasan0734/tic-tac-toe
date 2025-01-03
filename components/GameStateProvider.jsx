"use client"
import React, { useState, useEffect } from "react";

const GameStateProvider = ({ children }) => {
  const [newGame, setNewGame] = useState(false);
  const [resetGame, setResetGame] = useState(false);
  const [player, setPlayer] = useState("X");
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [start, setStart] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [draw, setDraw] = useState(false);
  const [strikeClass, setStrikeClass] = useState({
    class: null,
    width: 0,
    height: 0,
  });
  const [playerXScore, setPlayerXScore] = useState(0);
  const [playerOScore, setPlayerOScore] = useState(0);

  // Pass only the required props to children
  const context = {
    newGame,
    setNewGame,
    resetGame,
    setResetGame,
    player,
    setPlayer,
    tiles,
    setTiles,
    start,
    setStart,
    gameOver,
    setGameOver,
    winner,
    setWinner,
    draw,
    setDraw,
    strikeClass,
    setStrikeClass,
    playerXScore,
    setPlayerXScore,
    playerOScore,
    setPlayerOScore,
  };

  return (
    <div>
     {React.Children.map(children, (child) =>
        React.cloneElement(child, { newProp: 'value' })
      )}
    </div>
  );
};

export default GameStateProvider;
