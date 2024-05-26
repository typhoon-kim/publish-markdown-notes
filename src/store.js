import noteList from './assets/data/note_list.json'
import { readable, writable } from "svelte/store";
let notedata = readable(noteList, (set) => {
    set(noteList);
    return () => {};
});
export {notedata as noteList};
export let currentNote = writable(null);
export let leftNote = writable(null);
export let rightNote = writable(null);
export function getNote(noteId) {
    return noteList.find((note) => note.id == noteId);
}

export function getRoute(leftId, rightId) {
    if(leftId && rightId) {
        return `/book/${leftId}/${rightId}`;
    }
    else if(leftId && !rightId)  {
        return `/book/${leftId}`;
    }
    else return "/";
}