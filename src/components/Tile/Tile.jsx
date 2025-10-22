import React, { useEffect, useState } from "react";
import "./Tile.css";

const Tile = ({ value, style, merged, scoreGain, animateMove, animateMerge }) => {
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    if (scoreGain > 0) {
      setShowScore(true);
      const timer = setTimeout(() => setShowScore(false), 700);
      return () => clearTimeout(timer);
    }
  }, [scoreGain]);

  const getTileColor = (value) => {
    const colors = {
      0: "#cdc1b4",
      2: "#eee4da",
      4: "#ede0c8",
      8: "#f2b179",
      16: "#f59563",
      32: "#f67c5f",
      64: "#f65e3b",
      128: "#edcf72",
      256: "#edcc61",
      512: "#edc850",
      1024: "#edc53f",
      2048: "#edc22e",
    };
    return colors[value] || "#3c3a32";
  };

  // Helper to get blast color for tile
  const getBlastColor = (value) => {
    const blastColors = {
      2: "#eee4da",
      4: "#ede0c8",
      8: "#f2b179",
      16: "#f59563",
      32: "#f67c5f",
      64: "#f65e3b",
      128: "#edcf72",
      256: "#edcc61",
      512: "#edc850",
      1024: "#edc53f",
      2048: "#edc22e",
    };
    return blastColors[value] || "#3c3a32";
  };

  // Helper to check if tile is red
  const isRedTile = value === 32 || value === 64;

  // Build className for tile
  let tileClass = "tile";
  if (animateMove) tileClass += " tile-move";
  if (animateMerge) tileClass += " tile-merge";
  if (animateMerge && isRedTile) tileClass += " red-blast";

  // Set blast color style for merge animation
  const blastStyle = animateMerge
    ? { '--blast-color': getBlastColor(value) }
    : {};

  return (
    <div
      className={tileClass}
      style={{ backgroundColor: getTileColor(value), ...style, ...blastStyle }}
    >
      {value !== 0 ? value : ""}
      {showScore && scoreGain > 0 && (
        <div className="score-float">+{scoreGain}</div>
      )}
    </div>
  );
};

export default Tile;
