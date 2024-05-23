<script>
    import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "$lib/components/ui/full-dialog";
    import { Expand } from "lucide-svelte";
    export let title;
    export let open = false;
</script>

<Dialog bind:open >
    <DialogTrigger >
        <Expand on:click={ () => open = true } />
    </DialogTrigger>
    <DialogContent>
        <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
                <slot/>
            </DialogDescription>
        </DialogHeader>
    </DialogContent>
</Dialog>
