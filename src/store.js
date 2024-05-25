import { writable } from "svelte/store";

export let currentNote = writable(null);
export let leftNote = writable(null);
export let rightNote = writable(null);