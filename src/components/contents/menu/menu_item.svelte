<script>
    import CommandItem from "$lib/components/ui/command/command-item.svelte";
    import { createState } from "cmdk-sv";

    export let note;
    function handleMenuClick(note) {
        console.log(note);
    }

    const state = createState();
</script>
<CommandItem value={note.route + note.title} {state} class="p-1 font-medium text-muted-foreground text-sm" >
    <a class="ms-4" href="#none" on:click={()=>{
        handleMenuClick(note);
    }} >{note.title.replace(".md", "")}</a>
</CommandItem>