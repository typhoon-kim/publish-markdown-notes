<script>
    import CommandItem from "$lib/components/ui/command/command-item.svelte";
    export let note;
    function handleMenuClick(note) {
        console.log(note);
    }
</script>
<CommandItem value={note.route + note.title} class="p-1 font-medium text-muted-foreground text-sm" >
    <a class="ms-4" href="#none" on:click={()=>{
        handleMenuClick(note);
    }} >{note.title.replace(".md", "")}</a>
</CommandItem>