<script lang="ts">
	import type { Writable } from "svelte/store";
	import type { Board } from "./Board";
	import type { Tile } from "./Tile";
	import { setBackgroundColor, setTextColor } from "../../utils/tileStyling";
	import { countMines } from "../../utils/mineCounter";
	import { chordTile, refreshBoard, revealTilesAround, safeStart, setWrongFlags } from "../../utils/boardUtils";
	import type { Timer } from "./Timer";
	import { difficulty } from "./Stores";

	
    export let board: Writable<Board>;
    export let tile: Tile;
    export let width: number;
    export let timer: Timer;

    // set the number of mines around the tile, the background color and the text color
    $: tile.numberOfMines = countMines(tile, $board)
    $: $board.clicks, tile.backgroundStyle = setBackgroundColor(tile, $difficulty); // updated whenever a tile is clicked
    $: tile.textStyle = setTextColor(tile.numberOfMines);
    
    
    // left click 
    function handleLeftClick(){

        $board.clicks++; // value goes up so it triggers the background color update

        if (tile.isActivated){

            // timer started if needed
            if (!timer.isTimerRunning) {
                    timer.startTimer();
                }
            
                tile.isRevealed = true;

                // left click wont have any effect if the tile is flagged
                if (!tile.isFlagged){

                    
                    // safestart is executed if necessary
                    if ($board.safeStart && tile.isMine) { 
                        safeStart(tile, $board);
                        refreshBoard($board);
                    }

                  

                    // safestart turned off after first tile is clicked
                    if ($board.safeStart) $board.safeStart = false; 

                    

                    // reveal all tiles if the clicked tiles has no mines around
                    if (tile.numberOfMines == 0 && !tile.isMine) revealTilesAround(tile, $board, false);
                    
                    // chording
                    if (tile.isRevealed && !tile.isMine) chordTile(tile, $board)
                    
                    // if the revealed tile is a mine, the game is lost
                    if (tile.isMine) {
                        tile.isError = true;
                        setWrongFlags($board)
                        $board.isDefeat = true;
                    }
                }   
                
                
            }
        
    }

    // right click
    function handleRightClick(){
        if (tile.isActivated){

            // timer is started if needed
            if (!timer.isTimerRunning) {
                    timer.startTimer();
                }

            // tile is flagged or unflagged
            if (!tile.isFlagged && !tile.isRevealed){
                tile.isFlagged = true;
                $board.remainingMines--;
            }
            else if (tile.isFlagged) {
                tile.isFlagged = false;
                $board.remainingMines++;
            }
        }
    }



</script>

<button on:click={handleLeftClick} on:auxclick={handleRightClick}  
    class=" {tile.backgroundStyle} {tile.textStyle} aspect-square" style="font-size: {width/($board.columns*1.5)}px">


    {#if tile.isFlagged}
        🚩
    {:else if tile.isMine}
        💣
    {:else if tile.numberOfMines > 0 && tile.isRevealed }
        {tile.numberOfMines}
    {:else}
        <br> <!-- if left empty, sometimes the first square will have a visual bug (square has a shorter height than width)-->
    {/if}

 

</button>

<style>
</style>