import React from 'react';
import {motion} from "motion/react";

const GameStatus = ({player, start, gameOver}) => {
  return (
    <>
   <p className="text-sm text-muted-foreground">
                  {gameOver ? (
                    "Game over"
                  ) : start ? (
                    <>
                      <span className="text-primary font-semibold">
                        {player}
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
    </>
  )
}

export default GameStatus