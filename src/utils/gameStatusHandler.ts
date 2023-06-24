import type { Board } from "../routes/game/Board";
import type { Timer } from "../routes/game/Timer";

// checks every turn if the board has been completed (all mines flagged)
export function checkVictory(board: Board){

    // first check if all mines are flagged
    if (board.remainingMines == 0){

        for (let y = 0; y < board.rows; y++){
            for (let x = 0; x < board.columns; x++){
                const tile = board.board[y][x];
                if (tile.isMine && !tile.isFlagged) return false; // check if there's any mine that is not flagged
            }
        }
        return true;
    }

    // if not, check if all tiles with no mines are revealed (flagless win)
    for (let y = 0; y < board.rows; y++){
        for (let x = 0; x < board.columns; x++){
            const tile = board.board[y][x];
            if (!tile.isMine && !tile.isRevealed) return false;
        }
    }

    return true;
}

// checks if a mine has been revealed
export function checkDefeat(board: Board){

    for (let y = 0; y < board.rows; y++){
        for (let x = 0; x < board.columns; x++){
            const tile = board.board[y][x];
            if (tile.isMine && tile.isRevealed) return true; 
        }
    }

    return false;
}

export function handleVictory(board: Board, timer: Timer){

    // reveal all unflagged tiles
    for (let y = 0; y < board.rows; y++){
        for (let x = 0; x < board.columns; x++){
            const tile = board.board[y][x];

            tile.isActivated = false;

            if (tile.isMine && !tile.isFlagged){
                tile.isFlagged = true;
            }

            // check if there's any mine that is not flagged
            if (!tile.isRevealed && !tile.isFlagged) {
                tile.isRevealed = true;
            } 
        }
    }

    timer.stopTimer();
    board.isVictory = false;
}

export function handleDefeat(board: Board, timer: Timer){

    // reveal all unflagged mines
    for (let y = 0; y < board.rows; y++){
        for (let x = 0; x < board.columns; x++){
            const tile = board.board[y][x];

            tile.isActivated = false;
            if (tile.isMine && !tile.isFlagged) tile.isRevealed = true; // check if there's any mine that is not flagged
        }
    }
    
    timer.stopTimer();
    board.isDefeat = false;
}
