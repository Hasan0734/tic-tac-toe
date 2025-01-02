import { Circle, X } from "lucide-react";
import React from "react";
import { Card } from "./ui/card";
import { motion } from "motion/react";

const Draw = ({ resetGame }) => {
  return (
    <Card
      onClick={resetGame}
      className="cursor-pointer size-[216px] flex items-center justify-center flex-col gap-3 border p-3"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
        }}
        className="flex items-center gap-2"
      >
        <X className="size-20" />
        <Circle className="size-20" />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
        }}
        className="text-4xl uppercase font-bold text-muted-foreground"
      >
        Draw!
      </motion.h1>
    </Card>
  );
};

export default Draw;
