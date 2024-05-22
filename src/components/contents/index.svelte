<script>
    import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";
    import Separator from "$lib/components/ui/separator/separator.svelte";
    import IndexItem from "./index_item.svelte";

    export let title;
    export let noteList;
</script>
<article class="border rounded-md shadow-md note note-single flex flex-col">
    <section class="container flex flex-col">
        <h1 class="text-3xl h-16 font-extrabold w-full grow flex justify-center place-items-center">
            <span>{title}</span>
        </h1>
        <Separator class="my-2" />
    </section>
    <ScrollArea class="grow w-full">
        {#each noteList as note}
            <IndexItem {note} />
        {/each}
    </ScrollArea>
</article>