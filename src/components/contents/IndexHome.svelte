<script>
    import { querystring } from "svelte-spa-router";
    import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";
    import Separator from "$lib/components/ui/separator/separator.svelte";
    import IndexItem from "./IndexItem.svelte";
    import { onMount } from "svelte";
    import { notedata } from "$store";

    let title = "전체 글 목록";
    let indexData;

    const updateInfo = () => {
        const query = new URLSearchParams($querystring);
        if (query.has("tag")) {
            const tag = query.get("tag");
            title = `'${tag}'태그에 속한 글 목록`;
            indexData = $notedata.filter((note) => {
                return note.tags.includes(tag);
            });
        } else if (query.has("category")) {
            const category = query.get("category");
            title = `카테고리 '${category.replace("/", " > ")}'에 속한 글 목록`;
            indexData = $notedata.filter((note) => {
                return note.route.join("/") === category;
            });
        } else {
            indexData = [...$notedata];
        }
    
        indexData.sort((note_a, note_b) => {
            return note_b.updated - note_a.updated;
        });
    }

    onMount(updateInfo);
    $: $querystring, updateInfo();


</script>
<article class="border rounded-md shadow-md note note-single flex flex-col">
    <section class="container flex flex-col">
        <h1 class="text-3xl h-16 font-extrabold w-full grow flex justify-center place-items-center">
            <span>{`${title} (${indexData.length})`}</span>
        </h1>
        <Separator class="my-2" />
    </section>
    <ScrollArea class="grow w-full">
        {#each indexData as note}
            <IndexItem {note} />
        {/each}
    </ScrollArea>
</article>