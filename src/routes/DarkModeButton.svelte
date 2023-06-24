<script lang="ts">
	import { darkMode } from "./game/Stores";


    function toggleDarkMode(){
        $darkMode = !$darkMode;
        window.document.body.classList.toggle('dark-mode');
    }
</script>



<button on:click={toggleDarkMode} class="xl:text-2xl lg:text-xl sm:text-lg text-base hover:scale-125 transition duration-300 ease-out justify-self-end">
    {#if $darkMode}
        LIGHT MODE
    {:else}
        DARK MODE
    {/if}
</button>



