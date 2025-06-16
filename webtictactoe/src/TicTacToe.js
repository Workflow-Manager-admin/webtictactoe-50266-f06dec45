import React, { useState } from "react";
import "./TicTacToe.css";

// PUBLIC_INTERFACE
function TicTacToe() {
  /**
   * This is the main WebTicTacToe component.
   * - Renders a modern minimalistic 3x3 grid for Tic Tac Toe.
   * - Handles game state, user moves, and game status display.
   * - Adopts the provided theme (primary: #4CAF50, secondary: #FFC107, accent: #2196F3).
   */
  const emptyBoard = Array(9).fill(null);
  const [board, setBoard] = useState(emptyBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(board);

  function handleCellClick(idx) {
    if (board[idx] || winner) return; // Ignore if cell is taken or game over
    const nextBoard = board.slice();
    nextBoard[idx] = xIsNext ? "X" : "O";
    setBoard(nextBoard);
    setXIsNext(!xIsNext);
  }

  function handleReset() {
    setBoard(emptyBoard);
    setXIsNext(true);
  }

  let status;
  if (winner) {
    status = (
      <span>
        Winner:{" "}
        <span className={`ttt-accent`}>
          {winner}
        </span>
      </span>
    );
  } else if (board.every(Boolean)) {
    status = (
      <span>
        <span className="ttt-secondary">Draw!</span>
      </span>
    );
  } else {
    status = (
      <span>
        Next:{" "}
        <span className={xIsNext ? "ttt-primary" : "ttt-secondary"}>
          {xIsNext ? "X" : "O"}
        </span>
      </span>
    );
  }

  // Renders a cell in the grid
  function renderCell(idx) {
    return (
      <button
        className="ttt-cell"
        onClick={() => handleCellClick(idx)}
        aria-label={`Cell ${idx + 1}`}
      >
        {board[idx] && (
          <span
            className={
              board[idx] === "X" ? "ttt-primary" : "ttt-secondary"
            }
          >
            {board[idx]}
          </span>
        )}
      </button>
    );
  }

  return (
    <div className="ttt-container">
      <div className="ttt-status">{status}</div>
      <div className="ttt-board">
        {[0, 1, 2].map((row) => (
          <div className="ttt-row" key={row}>
            {renderCell(row * 3 + 0)}
            {renderCell(row * 3 + 1)}
            {renderCell(row * 3 + 2)}
          </div>
        ))}
      </div>
      <button className="ttt-reset-btn" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}

// PUBLIC_INTERFACE
function calculateWinner(sq) {
  /** Determines the winner of the board, if any. Returns "X", "O", or null. */
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Cols
    [0, 4, 8],
    [2, 4, 6], // Diags
  ];
  for (const [a, b, c] of lines) {
    if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) {
      return sq[a];
    }
  }
  return null;
}

export default TicTacToe;
