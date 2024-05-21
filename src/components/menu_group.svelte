<script>
    import {
        Collapsible, CollapsibleTrigger, CollapsibleContent } from "$lib/components/ui/collapsible";
    import { CommandGroup, CommandSeparator } from "$lib/components/ui/command";
    import { ChevronDown, ChevronRight } from "lucide-svelte";
    import MenuItem from "./menu_item.svelte";

    export let header;
    export let items;

    let open = true;
</script>

<Collapsible bind:open>
    <CollapsibleTrigger class="w-full">
        <div class="flex w-full p-1 font-semibold text-muted-foreground text-sm place-items-center" >
            {#if open}
                <ChevronDown class="h-3" />
            {/if}
            {#if !open}
                <ChevronRight class="h-3" />
            {/if}
            <p class="grow text-left">{`${header}`}</p>
        </div>
        <CommandSeparator class="mx-3" />
    </CollapsibleTrigger>
    <CollapsibleContent>
        <CommandGroup>
            {#each Object.keys(items) as key}
                {#if key === "notes"}
                    {#each items[key] as note}
                        <MenuItem {note} />
                    {/each}
                {/if}
                {#if key !== "notes"}
                    <svelte:self header={key} items={items[key]} />
                {/if}
            {/each}
        </CommandGroup>
    </CollapsibleContent>
</Collapsible>
