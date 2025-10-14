import React, { useEffect, useState } from "react";
import "./ScoreBoard.css";

const ScoreBoard = ({ score, bestScore }) => {
  const [lastScore, setLastScore] = useState(0);
  const [scoreGain, setScoreGain] = useState(0);

  useEffect(() => {
    if (score > lastScore) {
      setScoreGain(score - lastScore);
      setTimeout(() => setScoreGain(0), 800);
    }
    setLastScore(score);
  }, [score]);

  return (
    <div className="score-container">
      <div className="score-box current-score">
        <h4>SCORE</h4>
        <div className="score-wrapper">
          <p>{score}</p>
          {scoreGain > 0 && (
            <span className="score-gain">+{scoreGain}</span>
          )}
        </div>
      </div>

      <div className="score-box best-score">
        <h4>BEST</h4>
        <p>{bestScore}</p>
      </div>
    </div>
  );
};

export default ScoreBoard;
