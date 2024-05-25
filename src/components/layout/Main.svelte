<script>
    import { currentNote, leftNote, rightNote } from "$store";
    import IndexHome from "../contents/index_home.svelte";
    import NoteLeft from "../contents/note_left.svelte";
    import NoteRight from "../contents/note_right.svelte";
    import NoteSingle from "../contents/note_single.svelte";

    export let noteList;
    noteList.sort((note_a, note_b) => {
        return note_b.updated - note_a.updated;
    });

</script>

<main class="main">
    {#if $leftNote == null && $rightNote == null }
        <IndexHome {noteList} title="전체글" />
    {:else if $leftNote != null && $rightNote == null}
        <NoteSingle class={$currentNote == $leftNote ? "active" : ""} note={$leftNote}></NoteSingle>
    {:else if $leftNote == null && $rightNote != null}
        <NoteSingle class={$currentNote == $rightNote ? "active" : ""} note={$rightNote}></NoteSingle>
    {:else if $leftNote != null && $rightNote != null}
        <NoteLeft class={$currentNote == $leftNote ? "active" : ""} note={$leftNote} />
        <NoteRight class={$currentNote == $rightNote ? "active" : ""} note={$rightNote} />
    {/if}
</main>