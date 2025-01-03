import { Circle, X } from "lucide-react";
import React, { useState } from "react";
import BoardBorder from "./BoardBorder";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const GameBoard = ({
  handlePlayer,
  selectPlayer,
  tiles,
  setTiles,
  setGameOver,
  gameOver,
  setDraw,
  strikeClass,
  setStart,
}) => {
  const handleClick = (i) => {
    if (tiles[i]) return;
    if (gameOver) return;
    setStart(true);
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

  console.log(strikeClass?.height);

  return (
    <div className="relative h-[236px] py-2">
      <BoardBorder />

      {strikeClass.width
        ? strikeClass?.width !== 0 && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: strikeClass.width }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className={`absolute bg-primary z-20 ${strikeClass.class}`}
            ></motion.div>
          )
        : null}

      {strikeClass?.height
        ? strikeClass?.height !== 0 && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: strikeClass.height }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className={`absolute bg-primary z-20 ${strikeClass.class}`}
            ></motion.div>
          )
        : null}

      <table
        style={{ borderSpacing: "6px", borderCollapse: "separate" }}
        className=" mx-auto relative  my-0 z-10"
      >
        <tbody className="">
          {[0, 1, 2].map((row) => (
            <tr key={row}>
              {[0, 1, 2].map((col) => {
                const index = row * 3 + col; // Calculate the 1D index
                return (
                  <td
                    key={index}
                    onClick={() => handleClick(index)}
                    role="button"
                    className=" relative align-top size-[64px] p-2 cursor-pointer"
                  >
                    {/* <X className="w-full h-full" /> */}

                    <motion.span
                      className="w-full flex items-center justify-center relative size-[48px]"
                      key={tiles[index]}
                      initial={{ opacity: 0, scale: 0.4 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.4,
                        ease: "easeInOut",
                      }}
                    >
                      <X
                        className={cn(
                          "size-[48px] invisible absolute inset-0",
                          {
                            visible: tiles[index] === "X",
                          }
                        )}
                      />

                      <Circle
                        className={cn(
                          " size-[48px] invisible absolute inset-0",
                          {
                            visible: tiles[index] === "O",
                          }
                        )}
                      />
                    </motion.span>

                    {/* {renderIcon(tiles[index])} */}
                    {/* </motion.span> */}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GameBoard;

const renderIcon = (value) => {
  if (value === "X") return <X className="size-[48px]" />;
  if (value === "O") return <Circle className=" size-[48px]" />;
  return null;
};
