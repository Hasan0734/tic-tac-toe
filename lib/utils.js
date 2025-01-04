// import { winningCombination } from "@/data/constant";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function generateUniqueId() {
  const segments = [];
  const chars = "abcdefghijklmnopqrstuvwxyz"; // Adjust as needed

  for (let i = 0; i < 3; i++) {
    let segment = "";
    for (let j = 0; j < 4; j++) {
      segment += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    segments.push(segment);
  }

  return segments.join("-");
}


export const winnerChecker = ({
  winningCombination,
  tiles,
  setWinner,
  setGameOver,
  setPlayerXScore,
  setPlayerOScore,
  setSrikeClass,
  setMatchIndex,
}) => {
  for (const { combo, className, ...rest } of winningCombination) {
    const tileValue0 = tiles[combo[0]];
    const tileValue1 = tiles[combo[1]];
    const tileValue2 = tiles[combo[2]];

    if (
      tileValue0 !== null &&
      tileValue0 === tileValue1 &&
      tileValue1 === tileValue2
    ) {
      console.log(
        tileValue0,
        combo[0],
        tileValue1,
        combo[1],
        tileValue2,
        combo[2]
      );
      setMatchIndex([combo[0], combo[1], combo[2]]);
      setSrikeClass({ class: className, ...rest });
      setGameOver(true);
      setWinner(tileValue0);
      if (tileValue0 === "X") {
        setPlayerXScore((prev) => prev + 1);
      } else {
        setPlayerOScore((prev) => prev + 1);
      }
      return;
    }
  }
};

export const handleResetGame = ({
  setResetGame,
  resetGame,
  setTiles,
  setPlayer,
  setGameOver,
  setStart,
  setWinner,
  setDraw,
  setShowResult,
  setSrikeClass,
}) => {
  setResetGame(!resetGame);
  setTiles(Array(9).fill(null));
  setPlayer("X");
  setGameOver(false);
  setStart(false);
  setWinner(null);
  setDraw(false);
  setShowResult(false); // Reset visibility
  setSrikeClass({ class: null, width: 0, height: 0 });
};

export const handlePlayer = (player, setPlayer) => {
  if (player === "X") {
    setPlayer("O");
    return;
  } else {
    setPlayer("X");
  }
};
