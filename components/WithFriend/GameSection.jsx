"use client";
import React, { useEffect, useState } from "react";
import { cn, getPlayerId, handleResetGame, winnerChecker } from "@/lib/utils";
import { Card } from "../ui/card";
import PlayType from "../PlayType";
import { Button } from "../ui/button";
import Players from "../Players";
import GameStatus from "../GameStatus";
import Winner from "../Winner";
import Draw from "../Draw";
import GameBoard from "../GameBoard";
import { useParams } from "next/navigation";
import { createClientSocket } from "@/lib/socket";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const winningCombination = [
  {
    combo: [0, 1, 2],
    className: "top-[44px] left-[80px] h-1 right-0",
    width: "204px",
  }, // Top row
  {
    combo: [3, 4, 5],
    className: "top-[115px] left-[80px]  h-1 right-0",
    width: "204px",
  }, // Middle row
  {
    combo: [6, 7, 8],
    className: "top-[184px] left-[80px] h-1 right-0",
    width: "204px",
  }, // Bottom row
  {
    combo: [0, 3, 6],
    className: "top-[14px] left-[112px]  w-1",
    height: "204px",
  }, // Left column
  {
    combo: [1, 4, 7],
    className: "top-[14px] left-[182px] w-1",
    height: "204px",
  }, // Middle column
  {
    combo: [2, 5, 8],
    className: "top-[14px] right-[112px] w-1",
    height: "204px",
  }, // Right column
  {
    combo: [0, 4, 8],
    className: "top-4 left-[87px]  h-1 rotate-45 origin-top-left",
    width: "278px",
  }, // Top-left to bottom-right diagonal
  {
    combo: [2, 4, 6],
    className: " h-1 -rotate-45 top-[15px] right-[84px] origin-bottom-right",
    width: "278px",
  }, // Top-right to bottom-left diagonal
];

const GameSection = () => {
  const params = useParams();
  const [newGame, setNewGame] = useState(false);
  const [resetGame, setResetGame] = useState(false);
  const [player, setPlayer] = useState("");
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [start, setStart] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [draw, setDraw] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [strikeClass, setSrikeClass] = useState({
    class: null,
    width: 0,
    height: 0,
  });
  const [matchIndex, setMatchIndex] = useState([]);
  const [firstSelect, setFirstSelect] = useState("");
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [turn, setTurn] = useState("X"); // Current turn
  const [playerName, setPlayerName] = useState("");
  const [joined, setJoined] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [isOwner, setIsOwner] = useState(null);
  const [pendingRequest, setPendingRequest] = useState([]);
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleReset = () => {
    socket.emit("resetGame", !resetGame);
  };

  useEffect(() => {
    if (params?.invitedId) {
      fetch("/api/socketio").finally(() => {
        if (socket !== null) {
          // setConnected(socket.connected)
        } else {
          const newSocket = createClientSocket(params?.invitedId);

          newSocket.on("room_created", ({ owner }) => {
            setIsOwner(true);
            setLoading(false);
          });

          newSocket.on("join_request", ({ player }) => {
            setPendingRequest((prev) => [...prev, player]);
          });

          newSocket.on("join_accepted", ({ message }) => {
            toast({
              title: "Request",
              description: message,
            });
            setLoading(false);
          });
          newSocket.on("newGame", (payload) => {
            setNewGame(true);
          });

          newSocket.on("join_rejected", ({ message }) => {
            toast({
              title: "Request",
              description: message,
            });
            setLoading(false);
          });

          // newSocket.on("game_over", (gameOver, winner, scores) => {
          //   setWinner(winner)
          //   setGameOver(gameOver)
          //   setScores(scores)
          // })

          // newSocket.on("setPlayer", (payload) => {
          //   setPlayer(payload);
          // });

          setSocket(newSocket);
        }
      });
    }

    return () => {
      if (socket !== null) {
        socket.disconnect();
      }
    };
  }, [params?.invitedId, socket]);

  const handleSelectPlayer = (select) => {
    if (!start) {
      socket.emit("setPlayer", { value: select });
      socket.emit("firstSelect", select);
      socket.emit("setFirstSelect", select === "X" ? "O" : "X");
      return;
    }
    return;
  };

  const createRoom = () => {
    if (params?.invitedId && playerName) {
      socket?.emit("create_or_join_room", {
        roomId: params.invitedId,
        playerId: localStorage.getItem("playerId"),
        name: playerName,
      });
      setLoading(true);
    }
  };

  console.log(pendingRequest);

  const respondToRequest = (playerId, accept) => {
    socket.emit("respond_to_request", { playerId, accept });
    setPendingRequest((prev) =>
      prev.filter((player) => player.id !== playerId)
    );
  };

  return (
    <>
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-4xl font-semibold ">Tic Tac Toe</h1>

        <Card
          className={cn(
            "border relative min-h-[216px] rounded-md py-5 px-10 w-[450px] space-y-6",
            { "flex items-center justify-center flex-col": !newGame }
          )}
        >
          {newGame && <PlayType />}

          {!newGame && (
            <div className="flex items-center gap-3">
              <div>
                <Input
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>

              <Button disabled={loading} onClick={createRoom}>
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Joining
                  </>
                ) : (
                  "Join Game"
                )}
              </Button>
            </div>
          )}

          {newGame && (
            <>
              <div className="text-center w-full space-y-4 border-b pb-2">
                <Players
                  playerOScore={0}
                  playerXScore={0}
                  player={turn}
                  handlePlayer={handleSelectPlayer}
                />
                <GameStatus
                  placeholder={"Select player"}
                  gameOver={gameOver}
                  start={start}
                  player={turn}
                  socket={socket}
                />
              </div>

              {gameOver && showResult && winner ? (
                <Winner winner={winner} resetGame={handleReset} />
              ) : gameOver && showResult && draw ? (
                <Draw resetGame={handleReset} />
              ) : (
                <GameBoard
                  firstSelect={firstSelect}
                  key={resetGame}
                  setDraw={setDraw}
                  setGameOver={setGameOver}
                  setStart={setStart}
                  gameOver={gameOver}
                  setTiles={setTiles}
                  tiles={tiles}
                  player={player}
                  turn={turn}
                  strikeClass={strikeClass}
                  setPlayer={setPlayer}
                  socket={socket}
                />
              )}
              <div className="flex justify-center">
                <Button
                  onClick={handleReset}
                  variant={"ghost"}
                  className="text-muted-foreground"
                >
                  Restart game
                </Button>
              </div>
            </>
          )}

          {isOwner && pendingRequest?.length > 0 && (
            <div>
              <h3>Pending Requests</h3>
              <ul>
                {pendingRequest.map((pl, i) => (
                  <li key={pl.id}>
                    <div>{pl.name}</div>
                    <div>
                      <Button onClick={() => respondToRequest(pl.id, true)}>
                        Accept
                      </Button>
                      <Button onClick={() => respondToRequest(pl.id, false)}>
                        Reject
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Card>
      </div>
    </>
  );
};

export default GameSection;
