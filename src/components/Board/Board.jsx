import React from "react";
import Tile from "../Tile/Tile";
import "./Board.css";

const Board = ({ board, boardSize, boardDim }) => {
    const TILE_GAP = 10; // px

    const TILE_SIZE = (boardSize - TILE_GAP * (boardDim + 1)) / boardDim;

    return (
        <div
            className="board board-absolute"
            style={{ width: boardSize, height: boardSize }}
        >
            {/* Render board places with border */}
            {Array.from({ length: boardDim * boardDim }).map((_, idx) => {
                const row = Math.floor(idx / boardDim);
                const col = idx % boardDim;
                const x = col * (TILE_SIZE + TILE_GAP) + TILE_GAP;
                const y = row * (TILE_SIZE + TILE_GAP) + TILE_GAP;
                return (
                    <div
                        key={`place-${idx}`}
                        className="board-place"
                        style={{
                            "--tile-size": `${TILE_SIZE}px`,
                            "--x": `${x}px`,
                            "--y": `${y}px`,
                            position: "absolute",
                            width: TILE_SIZE,
                            height: TILE_SIZE,
                            left: x,
                            top: y,
                        }}
                    />
                );
            })}
            {/* Render tiles */}
            {board.flat().map((tile, idx) => {
                if (tile.value === 0) return null;
                const { row, col } = tile;
                const x = col * (TILE_SIZE + TILE_GAP) + TILE_GAP;
                const y = row * (TILE_SIZE + TILE_GAP) + TILE_GAP;
                let style = {
                    position: "absolute",
                    width: TILE_SIZE,
                    height: TILE_SIZE,
                    left: x,
                    top: y,
                    fontSize: TILE_SIZE / 2.5,
                    lineHeight: `${TILE_SIZE}px`,
                    transition: "left 0.2s, top 0.2s",
                };
                return (
                    <Tile
                        key={tile.id || idx}
                        value={tile.value}
                        style={style}
                        animateMove={tile.animateMove}
                        animateMerge={tile.animateMerge}
                        merged={tile.merged}
                        scoreGain={tile.scoreGain}
                    />
                );
            })}
        </div>
    );
};

export default Board;
