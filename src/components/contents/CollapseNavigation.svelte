<script>
    import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "$lib/components/ui/collapsible";
    import { ChevronDown, ChevronRight } from "lucide-svelte";
    let open = true;
</script>

<Collapsible bind:open>
    <CollapsibleTrigger>
        <div class="flex w-full p-1 place-items-center" >
            <slot name="header"/>
            {#if open}
                <ChevronDown class="h-3" />
            {/if}
            {#if !open}
                <ChevronRight class="h-3" />
            {/if}
        </div>
    </CollapsibleTrigger>
    <CollapsibleContent>
        <slot />
    </CollapsibleContent>
</Collapsible>