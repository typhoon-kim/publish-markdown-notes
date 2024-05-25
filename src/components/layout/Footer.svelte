<script>
    import { Badge } from "$lib/components/ui/badge";
    import { Separator } from "$lib/components/ui/separator/index.js";
    import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
    import { ExternalLink, ListOrdered, LogIn, LogOut, Tag } from "lucide-svelte";
    import FullDialog from "../contents/full_dialog.svelte";
    import GraphView from "../graph_view.svelte";
    import { currentNote } from "$store";
</script>

<footer class="footer flex flex-col text-sm">
    <aside class="shrink relative border p-2 w-full h-1/6">
        <h2 class="hidden">graph-view</h2>
        {#if $currentNote}
            <FullDialog class="absolute top-1 start-1" title={`Graph View (${$currentNote.title.replace(".md", "")})`} tooltip="Graph View">
                <GraphView id="graph-dialog" tagSwitch />
            </FullDialog>
            <GraphView id="graph-inner" />
        {/if}
    </aside>
    <Separator class="my-2"/>
    <div class="shrink max-h-fit">
        <h2 class="flex place-items-center"><Tag class="h-4" />태그</h2>
        {#if $currentNote}
            <ul class="flex flex-row place-content-center flex-wrap">
                {#each $currentNote.tags as tag}
                    <li class="m-0.5">
                        <Badge class="h-4 px-1.5"><a href="#none">{tag}</a></Badge>
                    </li>
                {/each}
            </ul>
        {/if}
    </div>
    <Separator class="my-2"/>
    <ScrollArea class="grow h-20">
        <nav>
            <h2 class="flex place-items-center"><ListOrdered class="h-4" />개요</h2>
            {#if $currentNote}
                <ul>
                    {#each $currentNote.outline as line}
                        {#each Object.entries(line) as [level, content]}
                        <li class="text-muted-foreground ms-4">
                            {#each Array(parseInt(level, 10) - 1) as _}<span class="border-s mx-2" />{/each}
                            <a href="#none" >{content}</a>
                        </li>
                        {/each}
                    {/each}
                </ul>
            {/if}
        </nav>
    </ScrollArea>
    <Separator class="my-2"/>
    <ScrollArea class="grow h-10">
        <nav>
            {#if $currentNote}
                <h2 class="flex place-items-center"><LogIn class="h-4" />들어오는 노트</h2>
                <ul class="text-muted-foreground ms-4">
                    <li><a href="#none" >Footnote</a></li>
                    <li><a href="#none" >Footnote</a></li>
                </ul>
            {/if}
                <hr class="m-1"/>
                <h2 class="flex place-items-center"><LogOut class="h-4" />나가는 노트</h2>
            {#if $currentNote}
                <ul class="text-muted-foreground ms-4">
                    <li><a href="#none" >Footnote</a></li>
                    <li><a href="#none" >Footnote</a></li>
                    <li><a href="#none" >Footnote</a></li>
                </ul>
            {/if}
                <hr class="m-1"/>
                <h2 class="flex place-items-center"><ExternalLink class="h-4" />외부링크</h2>
            {#if $currentNote}
                <ul class="text-muted-foreground ms-4">
                    <li><a href="#none" >Footnote</a></li>
                    <li><a href="#none" >Footnote</a></li>
                    <li><a href="#none" >Footnote</a></li>
                </ul>
            {/if}
        </nav>
    </ScrollArea>
</footer>
