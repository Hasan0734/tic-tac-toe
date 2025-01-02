import { Circle, X } from "lucide-react";
import React, { useState } from "react";
import BoardBorder from "./BoardBorder";
import { motion } from "motion/react";

const GameBoard = ({
  handlePlayer,
  selectPlayer,
  tiles,
  setTiles,
  setGameOver,
  gameOver,
  setDraw,
}) => {
  const handleClick = (i) => {
    if (tiles[i]) return;
    if (gameOver) return;
    const updateTiles = [...tiles];
    updateTiles[i] = selectPlayer;
    setTiles(updateTiles);
    handlePlayer();

    if (updateTiles.every((cell) => cell !== null)) {
      setGameOver(true); // Game is a draw
      setDraw(true);
      return;
    }
  };

  const renderIcon = (value) => {
    if (value === "X")
      return (
        <motion.span
        initial={{ opacity: 0, height: '6px'}}
        animate={{ opacity: 1, height: '100%' }}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
        }}
        >
          <X className="w-full h-full" />
        </motion.span>
      );
    if (value === "O")
      return (
        <motion.span
        initial={{ opacity: 0, height: '6px'}}
        animate={{ opacity: 1, height: '100%' }}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
        }}
        >
         <Circle className="w-full h-full" />
        </motion.span>
      
      );
    return null;
  };

  return (
    <div className="relative w-[216px] h-[216px]">
      <BoardBorder />

      <table className="absolute w-full h-full inset-0 left-[3px] top-[10px]">
        <tbody>
          {[0, 1, 2].map((row) => (
            <tr key={row}>
              {[0, 1, 2].map((col) => {
                const index = row * 3 + col; // Calculate the 1D index
                return (
                  <td key={index} className="">
                    <span
                      className="flex justify-center items-center relative p-2 size-[64px]"
                      onClick={() => handleClick(index)}
                    >
                      {/* <X className="w-full h-full" /> */}
                      {renderIcon(tiles[index])}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    // <div className='grid grid-cols-3 gap-5'>

    //     {[1,2,3,4,5,6,7,8,9].map(() => <BoardCard/>)}

    // </div>
  );
};

export default GameBoard;
