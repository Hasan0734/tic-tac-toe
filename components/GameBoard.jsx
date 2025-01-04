import { Circle, X } from "lucide-react";
import React from "react";
import BoardBorder from "./BoardBorder";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const GameBoard = ({
  player,
  tiles,
  setTiles,
  setGameOver,
  gameOver,
  setDraw,
  strikeClass,
  setStart,
  setPlayer,
  socket,
  firstSelect
}) => {
  const handleClick = (i) => {


    console.log(tiles)

    if(firstSelect === player){

    }


    if (!player && tiles[i] && gameOver) return;


    const updateTiles = [...tiles];
    updateTiles[i] = player;
   



    if (socket) {
      socket.emit("setPlayer", player === "X" ? "O" : "X");
      socket.emit("setTiles", updateTiles)
      socket.emit("setStart", true)
    } else {
      setStart(true);
      setPlayer(player === "X" ? "O" : "X");
      setTiles(updateTiles);
    }

    if (updateTiles.every((cell) => cell !== null)) {
      setGameOver(true); // Game is a draw
      setDraw(true);
      return;
    }
  };

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
