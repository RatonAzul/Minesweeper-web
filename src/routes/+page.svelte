<script lang="ts">
	import { goto } from "$app/navigation";
     import "../app.css";
	import DarkModeButton from "./DarkModeButton.svelte";
     import { difficulty } from "./game/Stores";

     // function used when a difficulty button is clicked: sets the difficulty and creates a new game
     function setDifficulty(selectedDifficulty: string){
          difficulty.set(selectedDifficulty)
          goto("game");
     }

     const difficulties = [{name: 'beginner', border: 'border-beginner'},
      {name: 'intermediate', border: 'border-intermediate'},
       {name: 'expert', border: 'border-expert'}];

</script>

<main class="w-full h-screen flex flex-col justify-center items-center font-numbers">

     <h1 class=" invisible xl:text-4xl lg:text-2xl sm:text-xl text-lg">Invisible text</h1>
     <div class="flex flex-col justify-center items-center w-full h-3/4 p-5">
          <!-- TITLE -->
          <h1 class=" xl:text-9xl lg:text-6xl sm:text-5xl text-3xl xl:mb-9 lg:mg-6 sm:mb-5 mb-3">MINESWEEPER</h1>

          
          <!-- DIFFICULTY BUTTONS -->
          {#each difficulties as difficulty }

               <button class="xl:text-5xl lg:text-3xl sm:text-2xl text-xl xl:mb-8 lg:mb-4 mb-2 ps-2 hover:scale-125 xl:hover:border-l-8 sm:hover:border-l-4 hover:border-l-2 {difficulty.border} transition 
               duration-300 ease-out" 
               on:click={() => setDifficulty(difficulty.name)}>
               {difficulty.name.toUpperCase()}</button>

          {/each}
     </div>

     <DarkModeButton></DarkModeButton>
    
</main>

<style>

</style>