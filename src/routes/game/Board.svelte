<script lang="ts">
	import TileComponent from "./Tile.svelte";
    import { difficulty } from "./Difficulty";
	import { Board } from "./Board";
	import { generateBoard } from "../../utils/boardUtils";
	import { writable, type Writable } from "svelte/store";
	import { onMount } from "svelte";
	import { Timer } from "./Timer";
	import { checkDefeat, checkVictory, handleDefeat, handleVictory } from "../../utils/gameStatusHandler";

    /**
    ----------------------------------- BOARD GENERATION -----------------------------------------------------------
    */

    // Create board based on the selected difficulty
    let board: Writable<Board>;
    
    if ($difficulty === "beginner") board = writable(new Board(9, 9, 10));
    else if ($difficulty === "intermediate") board = writable(new Board(16, 16, 40));
    else board = writable(new Board(16, 30, 99));
    
    // initial board generation
    $board.board = generateBoard($board);

    // reset the board
    function resetGame(){
        $board.remainingMines = $board.totalMines;
        $board.board = generateBoard($board);
        $board.safeStart = true;
        timer.stopTimer();
        timer.time = 0;
        emoji = "🙂";
    }

    /**
    ----------------------------------- BOARD STYLING -----------------------------------------------------------
    */

    // create style with the right number of columns
    let columnStyles: string;
    if ($difficulty === "beginner") columnStyles = "grid-cols-9";
    else if ($difficulty === "intermediate") columnStyles = "grid-cols-16";
    else columnStyles = "grid-cols-30";

    // width of the body, mainly used to get the right font sizes
    let width;


    /**
    ----------------------------------- TIMER -----------------------------------------------------------
    */

    let timer = new Timer();

    // Timer counts every 1000ms if its active
    onMount(() => {
        setInterval(() => {
        if (timer.isTimerRunning) {
            timer.time++;
        }
        }, 1000);
    });


    /**
    ----------------------------------- HANDLE VICTORY AND DEFEAT -----------------------------------------------------------
    */
    let emoji = "🙂";

    // check for victory or defeat everytime a tile is clicked
    $: $board.clicks, $board.isVictory = checkVictory($board);
    $: $board.clicks, $board.isDefeat = checkDefeat($board);

    // change the emoji if its a win or a defeat
    $: if ($board.isVictory){
        handleVictory($board, timer);
        emoji = "😎"
    }
    $: if ($board.isDefeat){
        handleDefeat($board, timer);
        emoji = "😵"
    }

</script>

<body bind:clientWidth={width} class="w-full h-full shadow-2xl ">
    
    <!-- Header with mines, reset button and timer -->
    <div class="col-span-full flex justify-around items-center header " style="height: {2/($board.rows+2)*100}%">
      
        <!-- Mines remaining-->
        <div class="h-3/4 aspect-doubleSquare text-center flex justify-center items-center" style="font-size: {width/($board.columns*1.3)}px">
            <div class="h-full aspect-square text-center flex justify-center items-center">🚩</div>
            <div class="h-full aspect-square text-center flex justify-start items-center">{$board.remainingMines}</div>
        </div>
       
        <!-- Reset button -->
        <button class="h-3/4 aspect-square" style="font-size: {width/($board.columns*1)}px" on:click={resetGame}>{emoji}</button>
        
        <!-- Timer -->
        <div class="h-3/4 aspect-doubleSquare text-center flex justify-center items-center" style="font-size: {width/($board.columns*1.3)}px">
             
            <div class="h-full aspect-square text-center flex justify-end items-center">{timer.time}</div>
            <div class="h-full aspect-square text-center flex justify-center items-center">⏱️</div>
        </div>
    </div>
    

    <!-- Board -->
    <div class="grid {columnStyles} " style="height: {$board.rows/($board.rows+2)*100}%">
        {#each $board.board as column}
            {#each column as tile }
                <TileComponent width={width} board={board} tile={tile} timer={timer}></TileComponent>
            {/each}
        {/each}
    </div>
   
</body>
