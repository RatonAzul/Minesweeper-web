export class Tile {

    x: number;
    y: number;
    isMine: boolean;
    isRevealed: boolean;
	isFlagged: boolean;
    isError: boolean // missplaced flags and clicked bombs
    isActivated: boolean;
    numberOfMines: number;
    backgroundStyle: string;
    textStyle: string;

    constructor(isMine: boolean){
        this.x = 0;
        this.y = 0;
        this.isMine = isMine;
        this.isRevealed = false;
		this.isFlagged = false;
        this.isError = false;
		this.isActivated = true;
        this.numberOfMines = 0;
        this.backgroundStyle = "";
        this.textStyle = "";
    }

}