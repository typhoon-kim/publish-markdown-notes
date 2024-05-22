<script>
    import MarkdownNote from "./markdown_note.svelte";
    export let note;
</script>
<article class="border rounded-md shadow-md note note-left" >
    <MarkdownNote {note} />
</article> 