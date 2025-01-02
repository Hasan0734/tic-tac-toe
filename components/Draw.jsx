import { Circle, X } from "lucide-react";
import React from "react";
import { Card } from "./ui/card";

const Draw = ({resetGame}) => {
  return (
    <Card onClick={resetGame} className="cursor-pointer size-[216px] flex items-center justify-center flex-col gap-3 border p-3">
      <div className="flex items-center gap-2">
      <X className="size-20" /> 
      <Circle className="size-20" />
      </div>
      <h1 className="text-4xl uppercase font-bold text-muted-foreground">Draw!</h1>
    </Card>
  );
};

export default Draw;
