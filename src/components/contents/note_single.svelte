<script>
    import MarkdownNote from "./markdown_note.svelte";
    export let note;
	let className = undefined;
	export { className as class };
</script>
<article class={`border rounded-md shadow-md note note-single ${className}`} >
    <MarkdownNote {note} />
</article> 