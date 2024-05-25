import noteList from './assets/data/note_list.json'
import { readable, writable } from "svelte/store";
export let currentNote = writable(null);
export let leftNote = writable(null);
export let rightNote = writable(null);
let notedata = readable(noteList, (set) => {
    set(noteList);
    return () => {};
});
export {notedata as noteList};
export function getNote(noteId) {
    return noteList.find((note) => note.id == noteId);
}