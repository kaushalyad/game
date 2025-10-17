import React from "react";
import Tile from "../Tile/Tile";
import "./Board.css";

const Board = ({ board, boardSize, boardDim }) => {
    const screenWidth = window.innerWidth;
    const maxBoardSize = Math.min(boardSize, screenWidth - 20); // leave 10px margin each side
    const TILE_GAP = screenWidth < 350 ? 4 : 10;

    // Calculate tile size
    const TILE_SIZE = Math.floor((maxBoardSize - TILE_GAP * (boardDim + 1)) / boardDim);

    // Total board content size (tiles + gaps)
    const totalBoardSize = TILE_SIZE * boardDim + TILE_GAP * (boardDim - 1);

    // Center offset for horizontal and vertical centering
    const offset = Math.floor((maxBoardSize - totalBoardSize) / 2);

    return (
        <div
            className="board board-absolute"
            style={{
                width: maxBoardSize,
                height: maxBoardSize,
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
            }}
        >
            {/* Board background */}
            <div
                style={{
                    width: totalBoardSize,
                    height: totalBoardSize,
                    position: "relative",
                }}
            >
                {/* Render grid cells */}
                {Array.from({ length: boardDim * boardDim }).map((_, idx) => {
                    const row = Math.floor(idx / boardDim);
                    const col = idx % boardDim;
                    const x = col * (TILE_SIZE + TILE_GAP);
                    const y = row * (TILE_SIZE + TILE_GAP);

                    return (
                        <div
                            key={`place-${idx}`}
                            className="board-place"
                            style={{
                                position: "absolute",
                                width: TILE_SIZE,
                                height: TILE_SIZE,
                                left: x,
                                top: y,
                                borderRadius: Math.floor(TILE_SIZE * 0.15),
                            }}
                        />
                    );
                })}

                {/* Render tiles */}
                {board.flat().map((tile, idx) => {
                    if (tile.value === 0) return null;
                    const { row, col } = tile;
                    const x = col * (TILE_SIZE + TILE_GAP);
                    const y = row * (TILE_SIZE + TILE_GAP);

                    const style = {
                        position: "absolute",
                        width: TILE_SIZE,
                        height: TILE_SIZE,
                        left: x,
                        top: y,
                        fontSize: Math.max(Math.floor(TILE_SIZE / 3.5), 8),
                        lineHeight: `${TILE_SIZE}px`,
                        transition: "left 0.2s, top 0.2s",
                        borderRadius: Math.floor(TILE_SIZE * 0.15),
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
        </div>
    );
};

export default Board;
