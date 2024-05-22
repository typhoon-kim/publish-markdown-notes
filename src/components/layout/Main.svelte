<script>
    import Index from "../contents/index.svelte";
    import NoteLeft from "../contents/note_left.svelte";
    import NoteRight from "../contents/note_right.svelte";
    import NoteSingle from "../contents/note_single.svelte";

    export let noteList;
    noteList.sort((note_a, note_b) => {
        return note_b.updated - note_a.updated;
    });

</script>

<main class="main">
    <Index {noteList} title="전체글" />
    <NoteLeft note={noteList[0]} />
    <NoteRight note={noteList[0]} />
</main>
