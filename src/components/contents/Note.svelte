<script>
    import { getNote } from "$store";
    import Markdown from "./Markdown.svelte";
	let className = undefined;
	export { className as class };
    export let side = "single";
    export let noteId;
</script>
<article class={`border rounded-md shadow-md note note-${side} ${className}`} >
    <Markdown note={getNote(noteId)} />
</article> 