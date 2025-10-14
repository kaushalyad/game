import React, { useState, useEffect } from "react";
import Board from "./components/Board/Board";
import ScoreBoard from "./components/ScoreBoard/ScoreBoard";
import GameOverModal from "./components/GameOverModal/GameOverModal";
import {
  generateEmptyBoard,
  addRandomTile,
  moveBoard,
  checkGameOver,
} from "./utils/gameLogic";
import "./App.css";

const App = () => {
  const [boardDim, setBoardDim] = useState(4); // x*x dimension
  const [board, setBoard] = useState(generateEmptyBoard(boardDim));
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(
    parseInt(localStorage.getItem("bestScore") || "0")
  );
  const [gameOver, setGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [scoreGain, setScoreGain] = useState(0);
  const [showGain, setShowGain] = useState(false);
  const [boardSize, setBoardSize] = useState(400); // px

  const startNewGame = () => {
    let newBoard = addRandomTile(addRandomTile(generateEmptyBoard(boardDim)));
    setBoard(newBoard);
    setScore(0);
    setGameOver(false);
    setIsWin(false);
    setScoreGain(0);
    setShowGain(false);
  };

  useEffect(() => {
    startNewGame();
  }, [boardDim]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent board movement if input is focused
      const active = document.activeElement;
      if (active && active.id === "board-dim") return;
      if (gameOver) return;
      const directions = { ArrowLeft: 0, ArrowUp: 1, ArrowRight: 2, ArrowDown: 3 };
      if (!(e.key in directions)) return;
      console.log(e);
      const [newBoard, moved, gain] = moveBoard(board, directions[e.key]);
      if (!moved) return;

      const updatedBoard = addRandomTile(newBoard);
      const newScore = score + gain;
      setBoard(updatedBoard);
      setScore(newScore);

      if (gain > 0) {
        setScoreGain(gain);
        setShowGain(true);
        setTimeout(() => setShowGain(false), 700); // fade out animation
      }

      if (newScore > bestScore) {
        setBestScore(newScore);
        localStorage.setItem("bestScore", newScore);
      }

      if (updatedBoard.flat().some(tile => tile.value === 2048)) setIsWin(true);
      else if (checkGameOver(updatedBoard)) setGameOver(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [board, score, bestScore, gameOver]);
  const handleChange = (e) => {
    // Allow user to type anything temporarily
    if (e.target.value === 'undefined') setBoardDim(4);
    else if (Number(e.target.value) < 4) setBoardDim(4);
    else if (Number(e.target.value) > 10) setBoardDim(10);
    else setBoardDim(Number(e.target.value))
  };


  return (
    <div>
      <div className="app-header">
      </div>
      <div className="game-container">
        <div className="game-header">
          {/* <div className="game-title">2048 GAME</div> */}
        </div>

        <div className="game-subtitle">Join the numbers and get to the 2048 tile!</div>

        <div className="scoreboard-container">
          <div>
            <ScoreBoard score={score} bestScore={bestScore} />
            {showGain && <div className="score-gain">+{scoreGain}</div>}
          </div>
          <div className="game-controls">
            <button onClick={startNewGame}>New Game</button>
          </div>
        </div>

        <div style={{ margin: '16px 0' }}>
          <label htmlFor="board-dim">Board Tiles: </label>
          <input
            id="board-dim"
            type="number"
            // value={boardDim}
            defaultValue={boardDim}
            onChange={handleChange}
            style={{ width: 60 }}
          />
          <span style={{ marginLeft: 8, color: "black" }}>{boardDim} x {boardDim}</span>
        </div>

        <Board board={board} boardSize={boardSize} boardDim={boardDim} />

        {(gameOver || isWin) && (
          <GameOverModal
            isWin={isWin}
            onRestart={startNewGame}
            onContinue={() => setIsWin(false)}
            onClose={() => {
              setGameOver(false);
              setIsWin(false);
            }}
          />
        )}

        <div className="play-instructions">
          <span>HOW TO PLAY:</span> Use your arrow keys or swipe to move the tiles. When
          two tiles with the same number touch, they merge into one. Get 2048 to win!
        </div>
      </div>
    </div>
  );
};

export default App;
