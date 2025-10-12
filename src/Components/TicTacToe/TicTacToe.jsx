import React, { useState, useEffect } from "react";
import "./TicTacToe.css";
import circle_icon from "../Assets/circle.png";
import cross_icon from "../Assets/cross.png";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isXNext, setIsXNext] = useState(true); // true = human (X)
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] !== "" || winner || !isXNext) return;

    const newBoard = [...board];
    newBoard[index] = "x";
    setBoard(newBoard);
    setIsXNext(false);
  };

  useEffect(() => {
    if (!isXNext && !winner) {
      const emptySpots = [];
      for (let i = 0; i < board.length; i++) {
        if (board[i] === "") emptySpots.push(i);
      }

      if (emptySpots.length === 0) return;

      const randomIndex =
        emptySpots[Math.floor(Math.random() * emptySpots.length)];

      const timer = setTimeout(() => {
        const newBoard = [...board];
        newBoard[randomIndex] = "o";
        setBoard(newBoard);
        setIsXNext(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [board, isXNext, winner]);

  useEffect(() => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a] === "x" ? "Cross" : "Circle");
        return;
      }
    }

    if (!board.includes("") && !winner) {
      setWinner("Draw");
    }
  }, [board, winner]);

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>

      {winner ? (
        <h2>{winner === "Draw" ? "It's a Draw!" : winner + " Wins!"}</h2>
      ) : (
        <p>{isXNext ? "Your turn (X)" : "Computer's turn (O)"}</p>
      )}

      <div className="board">
        {board.map((value, index) => (
          <div className="box" key={index} onClick={() => handleClick(index)}>
            {value === "x" && <img src={cross_icon} alt="X" />}
            {value === "o" && <img src={circle_icon} alt="O" />}
          </div>
        ))}
      </div>

      <button onClick={resetGame}>Reset</button>
    </div>
  );
};

export default TicTacToe;
