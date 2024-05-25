<script>
    import { link } from 'svelte-spa-router';
    import CommandItem from "$lib/components/ui/command/command-item.svelte";
    export let note;
    const noteLink = `/book/${note.id}`;
</script>
<CommandItem value={note.route.join("/") + note.name} class="p-1 font-medium text-muted-foreground text-sm" >
    <a class="ms-4" href={noteLink} use:link>{note.name}</a>
</CommandItem>