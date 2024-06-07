<script>
    import { currentNote, getNote, getGraphData, getRoute } from "$store";
    import { ExternalLink, ListOrdered, LogIn, LogOut, Tag } from "lucide-svelte";
    import { link } from "svelte-spa-router";
    import Badge from "$lib/components/ui/badge/badge.svelte";
    import FullDialog from "../common/FullDialog.svelte";
    import GraphView from "../common/GraphView.svelte";
    import CollapseNavigation from "../contents/CollapseNavigation.svelte";
    import { onMount } from "svelte";
    import Separator from "$lib/components/ui/separator/separator.svelte";

    let note, graphData;
    $: $currentNote, getNoteInfo;

    const getNoteInfo = () => {
        note = getNote($currentNote);
        graphData = getGraphData($currentNote);
    };

    onMount(() => {
        getNoteInfo();
    });
</script>

<footer class="footer flex flex-col text-sm">
    <aside class="shrink relative border p-2 w-full h-1/6">
        <h2 class="hidden">graph-view</h2>
        {#if note}
            <FullDialog
                class="absolute top-1 start-1"
                title={`Graph View (${note.name})`}
                tooltip="Graph View"
            >
                <GraphView id="graph-dialog" tagSwitch data={graphData} />
            </FullDialog>
            <GraphView id="graph-inner" data={graphData} />
        {/if}
    </aside>

    {#if note}
        <nav>
            <Separator class="my-2"/>
            <CollapseNavigation>
                <h2 slot="header" class="flex place-items-center"><Tag class="h-4" />태그</h2>
                <ul class="flex flex-row place-content-center flex-wrap">
                    {#each note.tags as tag}
                        <li class="m-0.5">
                            <Badge class="h-4 px-1.5">
                                <a href={`/index?tag=${tag}`} use:link>{tag}</a>
                            </Badge>
                        </li>
                    {/each}
                </ul>
            </CollapseNavigation>
            <Separator class="my-2"/>
            <CollapseNavigation>
                <h2 slot="header" class="flex place-items-center">
                    <ListOrdered class="h-4" />개요(On this page)
                </h2>
                <ul>
                    {#each note.outline as line}
                        <li class="text-muted-foreground ms-4">
                            {#each Array(parseInt(line.depth, 10) - 1) as _}<span
                                    class="border-s mx-2"
                                />{/each}
                            <a href="#none">{line.title}</a>
                        </li>
                    {/each}
                </ul>
            </CollapseNavigation>
            <Separator class="my-2"/>
            <CollapseNavigation>
                <h2 slot="header" class="flex place-items-center">
                    <LogIn class="h-4" />들어오는 노트
                </h2>
                <ul class="text-muted-foreground ms-4">
                    {#each graphData.nodes as node}
                        {#if node.group == "note-in"}
                            <li>
                                <a href={getRoute($currentNote, node.id)} use:link>{node.title}</a>
                            </li>
                        {/if}
                    {/each}
                </ul>
            </CollapseNavigation>
            <Separator class="my-2"/>
            <CollapseNavigation>
                <h2 slot="header" class="flex place-items-center">
                    <LogOut class="h-4" />나가는 노트
                </h2>
                <ul class="text-muted-foreground ms-4">
                    {#each graphData.nodes as node}
                        {#if node.group == "note-out"}
                            <li>
                                <a href={getRoute($currentNote, node.id)} use:link>{node.title}</a>
                            </li>
                        {/if}
                    {/each}
                </ul>
            </CollapseNavigation>
            <Separator class="my-2"/>
            <CollapseNavigation>
                <h2 slot="header" class="flex place-items-center">
                    <ExternalLink class="h-4" />외부링크
                </h2>

                <ul class="text-muted-foreground ms-4">
                    {#each note.links as link}
                        <li><a href={link.url}>{link.alias}</a></li>
                    {/each}
                </ul>
            </CollapseNavigation>
            <Separator class="my-2"/>
        </nav>
    {/if}
</footer>
