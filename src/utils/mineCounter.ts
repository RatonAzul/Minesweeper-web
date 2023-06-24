import type { Board } from "../routes/game/Board";
import type { Tile } from "../routes/game/Tile";


// used to calculate the values in the func below. If a value would be outside the board (like -1), it sets the value of that limit (0);
export function setLimitValue(value: number, limit: number, operator: string): number{
    if (operator === '+'){
        return value +1 >= limit ? limit -1 : value +1;
    }
    return value -1 < limit ? limit : value -1;
}

// count the number of mines around a tile and returns that number
export function countMines(tile: Tile, board: Board): number{
   
    // calculate the 4 cardinal values of the tiles above, below, left and right of the tile.
    const above = setLimitValue(tile.y, 0, '-');
    const below = setLimitValue(tile.y, board.rows, '+')
    const left = setLimitValue(tile.x, 0, '-');
    const right = setLimitValue(tile.x, board.columns, '+');

    
    let numberOfMines = 0;
    for (let x= left; x <= right; x++){
        for (let y= above; y <= below; y++){
                if (x != tile.x || y != tile.y){
                    if ((board.board[y][x]).isMine) {numberOfMines++}
                }
        }
    }
    
    return numberOfMines;
}

// same as the function above, but counts flags instead
export function countFlags(tile: Tile, board: Board): number{
   
    // calculate the 4 cardinal values of the tiles above, below, left and right of the tile.
    const above = setLimitValue(tile.y, 0, '-');
    const below = setLimitValue(tile.y, board.rows, '+')
    const left = setLimitValue(tile.x, 0, '-');
    const right = setLimitValue(tile.x, board.columns, '+');

    
    let numberOfFlags = 0;
    for (let x= left; x <= right; x++){
        for (let y= above; y <= below; y++){
                if (x != tile.x || y != tile.y){
                    if ((board.board[y][x]).isFlagged) {numberOfFlags++}
                }
        }
    }
    
    return numberOfFlags;
}


  