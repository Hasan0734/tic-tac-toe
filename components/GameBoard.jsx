import { Circle, X } from "lucide-react";
import React, { useState } from "react";

const GameBoard = ({ handlePlayer, selectPlayer }) => {
  const data = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];

  const [records, setRecords] = useState([]);

  const handleClick = (i, e) => {

    console.log(e.target)

    setRecords((pre) => [...pre, { [i]: player }]);
    

    // if (records.length < 9) {
    //   setRecords((pre) => [...pre, { [i]: player }]);
    //   handlePlayer();
    //   return;
    // }
  };

  console.log(records);

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
          {data.map((dt, i) => (
            <tr className="" key={i}>
              {dt.map((item) => (
                <td className="" key={item}>
                  <span
                    className="flex justify-center items-center relative  p-2 size-[64px] bg-orange-300"
                    onClick={(e) => handleClick(item, e)}
                  >
                    <X label={"X"}className="size-12 invisible absolute inset-0 w-full h-full" />
                    <Circle label={"O"}className="size-12 invisible absolute inset-0 w-full h-full" />
                  </span>
                </td>
              ))}
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
