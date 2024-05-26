<script>
    import { currentNote, getNote } from "$store";
    import { fade } from "svelte/transition";
    import Markdown from "./Markdown.svelte";
    import { X } from "lucide-svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import { location, replace } from "svelte-spa-router";
	let className = undefined;
	export { className as class };
    export let side = "single";
    export let noteId;

    const handleFocusNote = () => {
        $currentNote = noteId;
    }
</script>
<article class={`relative border rounded-md shadow-md note note-${side} ${className}`} on:click={handleFocusNote} in:fade={{duration: 1000}} >
    <Button variant="ghost" size="icon" class="absolute right-0 bottom-0 z-30" on:click={() => {
        replace($location.replace(`/${noteId}`, ""));
    }}>
        <X />
    </Button>
    <Markdown note={getNote(noteId)} />
</article> 