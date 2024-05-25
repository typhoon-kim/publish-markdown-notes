<script>
    import IndexHome from "../contents/IndexHome.svelte";
    import { currentNote, leftNote, rightNote } from "$store";
    import Note from "../contents/Note.svelte";
</script>

<main class="main">
    {#if !$leftNote && !$rightNote }
        <IndexHome />
    {:else if $leftNote && !$rightNote }
        <Note noteId={$leftNote}></Note>
    {:else if !$leftNote && $rightNote }
        <Note noteId={$rightNote}></Note>
    {:else if $leftNote && $rightNote }
        <Note class={$currentNote == $leftNote ? "active" : ""} noteId={$leftNote} side="left" />
        <Note class={$currentNote == $rightNote ? "active" : ""} noteId={$rightNote} side="right" />
    {/if}
</main>
