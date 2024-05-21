<script>
    import Separator from "$lib/components/ui/separator/separator.svelte";
    import MarkdownNote from "./MarkdownNote.svelte";

    export let noteList;

    let leftNote = noteList[0];
    let rightNote = noteList[1];
    leftNote = null;
    rightNote = null;
</script>

<main class="main">
    {#if leftNote == null && rightNote == null}
        <article class="border rounded-md shadow-md note note-left" >
            <MarkdownNote note={noteList[1]} />
        </article>
        <Separator orientation="vertical" />
        <article class="border rounded-md shadow-md note note-right" >
            <MarkdownNote note={noteList[1]} />
        </article>
    {:else if leftNote != null && rightNote == null}
        <article class="border rounded-md shadow-md note note-single" >
            <MarkdownNote note={leftNote} />
        </article>
    {:else if leftNote == null && rightNote != null}
        <article class="border rounded-md shadow-md note note-single" >
            <MarkdownNote note={rightNote} />
        </article>
    {:else if leftNote != null && rightNote != null}
        <article class="border rounded-md shadow-md note note-left" >
            <MarkdownNote note={leftNote} />
        </article>
        <Separator orientation="vertical" />
        <article class="border rounded-md shadow-md note note-right" >
            <MarkdownNote note={rightNote} />
        </article>
    {/if}
</main>
