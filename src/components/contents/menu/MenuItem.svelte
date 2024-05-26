<script>
    import { link } from 'svelte-spa-router';
    import CommandItem from "$lib/components/ui/command/command-item.svelte";
    import { currentNote, getRoute, leftNote, rightNote } from '$store';
    export let note;
    
    $: notLink = $currentNote ? getRoute($currentNote, note.id) : getRoute(note.id, null);
</script>
<CommandItem 
    value={note.route.join("/") + note.name} 
    class={`p-1 font-medium text-muted-foreground text-sm`} >
    <a class={`ms-4 ${($leftNote == note.id || $rightNote == note.id) && "active font-extrabold pointer-events-none text-primary"}`} 
        href={notLink} 
        use:link 
        on:click={() => $currentNote = note.id}>{note.name}</a>
</CommandItem>