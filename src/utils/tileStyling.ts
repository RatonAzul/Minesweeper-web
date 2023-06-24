
import type { Tile } from "../routes/game/Tile";

// set different colors to revealed and unrevealed tiles. They follow a checkered pattern
export function setBackgroundColor(tile: Tile, difficulty: string):string{
   

    if (tile.isRevealed && tile.isFlagged) return "bg-error-light";
    if (tile.isError && tile.isMine) return "bg-error-dark";
   
    
    // revealed tiles (yellow-ish )
    if (tile.isRevealed && !tile.isFlagged){
        if ((tile.x + tile.y)%2==0) return "bg-revealed-dark z-10"
        return "bg-revealed-light";
    }

    // unrevealed tiles for the 3 difficulties

    // beginner
    if (difficulty == 'beginner'){
        if ((tile.x + tile.y)%2==0) return "bg-beginner";
        return "bg-beginner-light";

    // intermediate
    }else if (difficulty == 'intermediate'){
        if ((tile.x + tile.y)%2==0) return "bg-intermediate";
        return "bg-intermediate-light";

    // expert
    }else{
        if ((tile.x + tile.y)%2==0) return "bg-expert";
        return "bg-expert-light";
    }
}


// set each number their respective color
export function setTextColor(numberOfMines: number): string{
    
    switch(numberOfMines){
        case 1: return 'text-blue-one'; 
        case 2: return 'text-green-two'; 
        case 3: return 'text-red-three'; 
        case 4: return 'text-purple-four'; 
        case 5: return 'text-magenta-five'; 
        case 6: return 'text-turquoise-six'; 
        case 7: return 'text-dark-gray-seven'; // 7 is 
        case 8: return 'text-light-gray-eight';
        default: return "";
    }
}