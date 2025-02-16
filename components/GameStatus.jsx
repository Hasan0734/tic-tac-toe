import React from 'react';
import { motion } from "framer-motion";

const GameStatus = ({player, start, gameOver, placeholder}) => {
  return (
    <>
   <p className="text-sm text-muted-foreground">
                  {gameOver ? (
                    "Game over"
                  ) : start || player? (
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
                      {placeholder}
                    </motion.span>
                  )}
                </p>
    </>
  )
}

export default GameStatus