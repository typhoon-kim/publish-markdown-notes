<script>
    import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "$lib/components/ui/full-dialog";
    import { Expand } from "lucide-svelte";
    let className = undefined;
    export {className as class};
    export let title;
    export let open = false;
</script>

<Dialog {open}>
    <DialogTrigger class={className} >
        <Expand />
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
