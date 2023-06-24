import type { Tile } from "./Tile";

export class Board{

    rows: number;
    columns: number;
    totalMines: number;
    remainingMines: number;
    board: Tile[][];
    safeStart: boolean;
    isVictory: boolean;
    isDefeat: boolean;

    clicks: number; // used to update all tiles, probably a bad method but it works XD


    constructor(rows: number, columns: number, totalMines: number){
        this.rows = rows;
        this.columns = columns;
        this.totalMines = totalMines;
        this.remainingMines = totalMines;
        this.board = [[]];
        this.safeStart = true;
        this.isVictory = false;
        this.isDefeat = false;

        this.clicks = 0;
    }
}