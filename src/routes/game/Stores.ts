import { writable } from "svelte/store";

const difficulty = writable("beginner");
const darkMode = writable(false);

export {
    difficulty, darkMode
}