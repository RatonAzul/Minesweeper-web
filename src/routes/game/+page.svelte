<script lang="ts">
	import { difficulty } from "./Stores";
	import Board from "./Board.svelte";
	import DarkModeButton from "../DarkModeButton.svelte";


    // responsive game board
    let containerHeight: number;
    let containerWidth: number;

    // board size and aspect ratio
    let boardStyles: string;
    let boardAspect: string;

    let aspectRatio = 9/11;

    // select correct aspect ratio for the board
    switch($difficulty){
        case 'beginner': boardAspect = " aspect-beginner "; break;
        case 'intermediate': boardAspect = " aspect-intermediate "; aspectRatio = 16/18; break;
        case 'expert': boardAspect = " aspect-expert "; aspectRatio = 30/18; 
    }


    $: if (containerWidth > containerHeight*aspectRatio){
        boardStyles = "h-full";
    }
    else boardStyles = "w-full";

</script>


<body class=" font-numbers flex flex-col justify-center items-center w-screen h-screen">
    
    <!-- return to menu button -->
    <section class="w-full flex justify-around">
        <div class="w-1/4 text-center xl:text-4xl lg:text-2xl sm:text-xl text-lg hover:scale-125 transition duration-300 ease-out" ><a href=".">RETURN TO MENU</a></div>
    </section>
    
    <!-- board -->
    <main bind:clientHeight={containerHeight} bind:clientWidth={containerWidth} class="w-full h-3/4 p-5 grid">
        
       <div class="place-self-center {boardStyles} {boardAspect}">
            <Board></Board>
       </div>
    </main>

    <DarkModeButton></DarkModeButton>
</body>

<style>
    :global(body.dark-mode){
        color: rgb(255, 249, 229);
        background-color: rgb(33, 33, 51); 
    }
</style>
