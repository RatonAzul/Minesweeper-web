import { writable } from "svelte/store";

const difficulty = writable("beginner");

export {
    difficulty
}