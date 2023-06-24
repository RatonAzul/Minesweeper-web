import type { Board } from "../routes/game/Board";
import { Tile } from "../routes/game/Tile";
import { countFlags, countMines, setLimitValue } from "./mineCounter";




/**
----------------------------------- BOARD GENERATION -----------------------------------------------------------
 */


function generateTiles(board: Board): Tile[]{

    const totalTiles: number = board.rows * board.columns;
    const totalMines: number = board.totalMines;


    // returns array with all the tiles
    return Array.from({ length: totalMines }, () => new Tile(true))
    .concat(Array.from({ length: totalTiles - totalMines }, () => new Tile(false)));
}


// randomizes the order of the tiles so that mine placement is random and gives them their x and y positions
function shuffleTiles(initialTiles: Tile[], board: Board) :Tile[][] {

    // tile order is randomized using the Fisher-Yates algorithm
    for (let i = initialTiles.length -1 ; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [initialTiles[i], initialTiles[j]] = [initialTiles[j], initialTiles[i]];

    }
    
    // an x and y position is assigned to each tile
    const shuffledBoard:Tile[][] = [];
    let i = 0;
    
    for (let y = 0; y < board.rows; y++){
        shuffledBoard[y] = [];
        for (let x = 0; x < board.columns; x++){
            initialTiles[i].x = x;
            initialTiles[i].y = y;
            shuffledBoard[y][x] = initialTiles[i];
            i++;
        }
    }
    return shuffledBoard;
}

// executes both functions and returns the array of ordered tiles that will be used as gameboard
export function generateBoard(board: Board){
    return shuffleTiles(generateTiles(board), board);
}



// refreshes the number of mines of all the tiles after it changes (used when safestart prevents you from clicking a mine on turn 1 by moving it somewhere else)
export function refreshBoard(board: Board){
    for (let y = 0; y < board.rows; y++){
        for (let x = 0; x < board.columns; x++){
            const tile = board.board[y][x];
            tile.numberOfMines = countMines(tile, board);   
        }
    }
}


// prevents the player from pressing a tile with a mine as its first tile by moving that mine to another random tile
export function safeStart(tile: Tile, board: Board){
    tile.isMine = false;
    let mineMoved = false;
    while (!mineMoved){
        const randomX = Math.floor(Math.random() * board.columns);
        const randomY = Math.floor(Math.random() * board.rows);

        const tile = board.board[randomY][randomX];
        if (!tile.isMine){
            tile.isMine = true;
            mineMoved = true;
        }
    }
}

/**
----------------------------------- REVEAL TILES -----------------------------------------------------------
 */


export function revealTilesAround(tile: Tile, board: Board, revealMines = true) {
    const above = setLimitValue(tile.y, 0, '-');
    const below = setLimitValue(tile.y, board.rows, '+');
    const left = setLimitValue(tile.x, 0, '-');
    const right = setLimitValue(tile.x, board.columns, '+');
  
    for (let x = left; x <= right; x++) {
      for (let y = above; y <= below; y++) {
        if (x !== tile.x || y !== tile.y) {
          const currentTile = board.board[y][x];

          // marks mines that are not flagged or wrongly flagged tiles as errors
          if (currentTile.isMine && !currentTile.isFlagged || currentTile.isFlagged && !currentTile.isMine) currentTile.isError = true; 

          if (!currentTile.isRevealed && (!currentTile.isFlagged || currentTile.isFlagged && !currentTile.isMine) && (revealMines || !currentTile.isMine)) {
            currentTile.isRevealed = true;
            
            // if the current tile has no mines around, repeat the process
            if (currentTile.numberOfMines === 0) {
              currentTile.isFlagged = false;
              revealTilesAround(currentTile, board, revealMines);
            }
          }
        }
      }
    }
  }


  export function chordTile(tile: Tile, board: Board) {
    
    if (countFlags(tile, board) == tile.numberOfMines){
        revealTilesAround(tile, board);
    }
    
  }

  // set the wrong flags in red
  export function setWrongFlags(board: Board){

    for (let y = 0; y < board.rows; y++){
        for (let x = 0; x < board.columns; x++){
            const tile = board.board[y][x];
            if (tile.isFlagged && !tile.isMine) {
              tile.isError = tile.isRevealed = true;
            }
        }
    }

    return false;
}


