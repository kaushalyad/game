import React from "react";
import "./GameOverModal.css";

const GameOverModal = ({ isWin, onRestart, onContinue, onClose }) => {
  return (
    <div className="overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>

        <h2 className={isWin ? "win-text" : "lose-text"}>
          {isWin
            ? "🎉 Congratulations! You reached 2048!"
            : "😞 Game Over! Better luck next time!"}
        </h2>

        <p className="sub-text">
          {isWin
            ? "Amazing! You’ve mastered the board. Try pushing even further!"
            : "Don’t give up — every move teaches you something. Try again!"}
        </p>

        <div className="button-group">
          {isWin && (
            <button className="continue-btn" onClick={onContinue}>
              🚀 Keep Playing
            </button>
          )}
          <button className="restart-btn" onClick={onRestart}>
            🔁 Restart Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
