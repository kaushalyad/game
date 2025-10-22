let tileIdCounter = 1;


export const generateEmptyBoard = (dim = 4) => {
    return Array.from({ length: dim }, (_, row) =>
        Array(dim).fill().map((_, col) => ({
            id: tileIdCounter++,
            value: 0,
            animateMove: false,
            animateMerge: false,
            merged: false,
            scoreGain: 0,
            row,
            col,
            prevRow: row,
            prevCol: col
        }))
    );

};

export const addRandomTile = (board) => {
    const emptyCells = [];
    board.forEach((row, i) =>
        row.forEach((cell, j) => {
            if (cell.value === 0) emptyCells.push({ i, j });
        })
    );

    if (emptyCells.length === 0) return board;

    const { i, j } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[i][j] = {
        id: tileIdCounter++,
        value: Math.random() < 0.9 ? 2 : 4,
        animateMove: true,
        animateMerge: false,
        merged: false,
        scoreGain: 0,
        row: i,
        col: j,
        prevRow: i,
        prevCol: j
    };
    return board;
};



export const moveBoard = (board, direction) => {
    let dim = board.length;
    let prevBoard = board.map((row, i) => row.map((tile, j) => ({ ...tile })));
    let rotated = rotateBoard(board, direction);
    let [newBoard, moved, scoreGain] = slideLeft(rotated, dim);
    newBoard = rotateBoard(newBoard, (4 - direction) % 4);
    // Update positions and previous positions
    newBoard.forEach((row, i) => {
        row.forEach((tile, j) => {
            tile.prevRow = tile.row;
            tile.prevCol = tile.col;
            tile.row = i;
            tile.col = j;
        });
    });

    return [newBoard, moved, scoreGain];

};



const slideLeft = (board, dim) => {

    let moved = false;
    let scoreGain = 0;
    const newBoard = board.map((row, rowIdx) => {
        // Filter out empty tiles
        const filtered = row.filter((tile) => tile.value !== 0);
        let result = [];
        let i = 0;
        let colIdx = 0;
        while (i < filtered.length) {
            if (
                i < filtered.length - 1 &&
                filtered[i].value === filtered[i + 1].value
            ) {
                // Merge tiles
                const mergedValue = filtered[i].value * 2;
                scoreGain += mergedValue;
                result.push({
                    id: tileIdCounter++,
                    value: mergedValue,
                    animateMove: false,
                    animateMerge: true,
                    merged: true,
                    scoreGain: mergedValue,
                    row: rowIdx,
                    col: colIdx,
                    prevRow: filtered[i].row,
                    prevCol: filtered[i].col
                });
                i += 2;
                moved = true;
                colIdx++;
            } else {
                // Move tile
                result.push({
                    ...filtered[i],
                    animateMove: true,
                    animateMerge: false,
                    merged: false,
                    scoreGain: 0,
                    row: rowIdx,
                    col: colIdx,
                    prevRow: filtered[i].row,
                    prevCol: filtered[i].col
                });
                i += 1;
                colIdx++;
            }
        }
        // Fill the rest with empty tiles
        while (result.length < dim) {
            result.push({
                id: tileIdCounter++,
                value: 0,
                animateMove: false,
                animateMerge: false,
                merged: false,
                scoreGain: 0,
                row: rowIdx,
                col: result.length,
                prevRow: rowIdx,
                prevCol: result.length
            });
        }

        // Check if row changed

        if (JSON.stringify(result.map(t => t.value)) !== JSON.stringify(row.map(t => t.value))) moved = true;

        return result;
    });
    return [newBoard, moved, scoreGain];
};


const rotateBoard = (board, times) => {
    let newBoard = board.map((r) => [...r]);
    for (let t = 0; t < times; t++) {
        newBoard = newBoard[0].map((_, i) =>
            newBoard.map((row) => row[newBoard.length - 1 - i])
        );
    }
    return newBoard;
};


export const checkGameOver = (board) => {
    let dim = board.length;
    for (let i = 0; i < dim; i++) {
        for (let j = 0; j < dim; j++) {
            if (board[i][j].value === 0) return false;
            if (j < dim - 1 && board[i][j].value === board[i][j + 1].value) return false;
            if (i < dim - 1 && board[i][j].value === board[i + 1][j].value) return false;
        }
    }
    return true;
};
