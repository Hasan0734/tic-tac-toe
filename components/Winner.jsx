import { Circle, X } from "lucide-react";
import React from "react";
import { Card } from "./ui/card";
import { motion } from "motion/react";

const Winner = ({ winner, resetGame }) => {
  return (

      <Card
        onClick={resetGame}
        className=" cursor-pointer size-[216px] flex items-center justify-center flex-col gap-3 border p-3 "
      >
        <motion.span
         initial={{ opacity: 0, scale: 0.3 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{
           duration: 0.6,
           ease: "easeInOut",
         }}
        
        >
        {winner === "X" ? (
          <X className="size-24" />
        ) : (
          <Circle className="size-24" />
        )}
        </motion.span>
        <motion.h1
            initial={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
            }}
        className="text-4xl uppercase font-bold text-muted-foreground">
          Winner!
        </motion.h1>
      </Card>
   
  );
};

export default Winner;
