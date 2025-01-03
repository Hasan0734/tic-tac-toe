import { cn, handlePlayer } from "@/lib/utils";
import { Circle, X } from "lucide-react";
import React from "react";

const Players = ({ start, player, playerOScore, playerXScore, setPlayer }) => {
  return (
    <>
      <div className="flex items-center w-full gap-4">
        <div
          onClick={() => (start ? "" : handlePlayer(player, setPlayer))}
          className={cn(
            "flex-grow border rounded-md px-4 py-1.5 flex items-center justify-between cursor-pointer",
            { "border-b-primary border-b-4 ": player === "X" }
          )}
        >
          <X className="size-5" />
          <span className="text-xl text-gray-400 font-semibold">
            {playerXScore ? playerXScore : "-"}
          </span>
        </div>
        <div
          onClick={() => (start ? "" : handlePlayer(player, setPlayer))}
          className={cn(
            "flex-grow border rounded-md px-4 py-1.5 flex items-center justify-between cursor-pointer",
            { "border-b-primary  border-b-4 ": player === "O" }
          )}
        >
          <Circle className="size-5" />
          <span className="text-xl text-gray-400 font-semibold">
            {playerOScore ? playerOScore : "-"}
          </span>
        </div>
      </div>
    </>
  );
};

export default Players;
