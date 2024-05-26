<script>
    import { currentNote, getNote } from "$store";
    import Markdown from "./Markdown.svelte";
	let className = undefined;
	export { className as class };
    export let side = "single";
    export let noteId;

    const handleFocusNote = () => {
        $currentNote = noteId;
    }
</script>
<article class={`border rounded-md shadow-md note note-${side} ${className}`} on:click={handleFocusNote} >
    <Markdown note={getNote(noteId)} />
</article> 