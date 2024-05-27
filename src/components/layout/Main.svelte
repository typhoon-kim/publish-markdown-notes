<script>
    import { currentNote, leftNote, rightNote } from "$store";
    import IndexHome from "../contents/IndexHome.svelte";
    import Note from "../contents/Note.svelte";
    import Separator from "$lib/components/ui/separator/separator.svelte";
</script>

<main class="main">
    {#if !$leftNote && !$rightNote }
        <IndexHome />
    {:else if $leftNote && !$rightNote }
        <Note noteId={$leftNote} side="single" />
    {:else if !$leftNote && $rightNote }
        <Note noteId={$rightNote} side="single" />
    {:else if $leftNote && $rightNote }
        <Note class={$currentNote === $leftNote && "active"} noteId={$leftNote} side="left" />
        <Separator orientation="vertical" />
        <Note class={$currentNote === $rightNote && "active"} noteId={$rightNote} side="right" />
    {/if}
</main>
