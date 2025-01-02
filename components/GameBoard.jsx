import { Circle, X } from "lucide-react";
import React, { useState } from "react";

const GameBoard = ({ handlePlayer, selectPlayer, tiles, setTiles }) => {
  const handleClick = (i) => {
    if (tiles[i]) return;

    const updateTiles = [...tiles];
    updateTiles[i] = selectPlayer;
    setTiles(updateTiles);
    handlePlayer();
  };

  const renderIcon = (value) => {
    if (value === "X") return <X className="w-full h-full" />;
    if (value === "O") return <Circle className="w-full h-full" />;
    return null;
  };

  return (
    <div className="relative w-[216px] h-[216px]">
      <svg className="stroke-primary stroke-[6px] h-full w-full">
        <path
          d="M108,83L6,83"
          style={{
            strokeDasharray: 102,
            strokeDashoffset: 0,
          }}
        ></path>
        <path
          d="M108,153L6,153"
          style={{
            strokeDasharray: 102,
            strokeDashoffset: 0,
          }}
        ></path>
        <path
          d="M108,83L210,83"
          style={{
            strokeDasharray: 102,
            strokeDashoffset: 0,
          }}
        ></path>
        <path
          d="M108,153L210,153"
          style={{
            strokeDasharray: 102,
            strokeDashoffset: 0,
          }}
        ></path>
        <path
          d="M73,118L73,16"
          style={{
            strokeDasharray: 102,
            strokeDashoffset: 0,
          }}
        ></path>
        <path
          d="M143,118L143,16"
          style={{
            strokeDasharray: 102,
            strokeDashoffset: 0,
          }}
        ></path>
        <path
          d="M73,118L73,220"
          style={{
            strokeDasharray: 102,
            strokeDashoffset: 0,
          }}
        ></path>
        <path
          d="M143,118L143,220"
          style={{
            strokeDasharray: 102,
            strokeDashoffset: 0,
          }}
        ></path>
      </svg>

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
