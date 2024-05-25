<script>
    import Button from "$lib/components/ui/button/button.svelte";
    import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "$lib/components/ui/full-dialog";
    import { Tooltip, TooltipContent, TooltipTrigger } from "$lib/components/ui/tooltip";
    import { Expand } from "lucide-svelte";
    let className = undefined;
    export {className as class};
    export let title;
    export let open = false;
    export let tooltip = undefined;
    export let tooltipAlign = "bottom";
</script>

<Dialog {open}>
    <DialogTrigger class={className} >
        <Button size="icon" variant="outline">
            {#if tooltip}
                <Tooltip openDelay={500} >
                    <TooltipTrigger>
                        <slot name="button-icon"><Expand /></slot>
                    </TooltipTrigger>
                    <TooltipContent side={tooltipAlign}>
                        <p>{tooltip}</p>
                    </TooltipContent>
                </Tooltip>
            {:else}
                <slot name="button-icon"><Expand /></slot>
            {/if}
        </Button>
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
