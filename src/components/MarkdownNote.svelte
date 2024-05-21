<script>
    import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "$lib/components/ui/breadcrumb";
    import ScrollAreaWithProgress from "$lib/components/ui/scroll-area-with-progress/scroll-area-with-progress.svelte";
    import { mode } from "mode-watcher";
    export let note;

    console.log(note.route)
    const breadcrumb = note.route.split("/");
    const title = note.title.replace(".md", "");
</script>

<ScrollAreaWithProgress class="h-full w-full">
    <Breadcrumb>
        <BreadcrumbList>
            {#each breadcrumb as item}
                <BreadcrumbItem>
                    <BreadcrumbLink href={item}>{item}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
            {/each}
            <BreadcrumbItem>
                <BreadcrumbPage>{title}</BreadcrumbPage>
            </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>
    <h1 class="text-4xl my-2 font-extrabold p-2">{title}</h1>
    <zero-md class="markdown-body w-full" src={"publish/" + note.route + "/" + note.title}>
        <template>
            <style>
                * {
                    max-width: 100%;
                    overflow-x: auto;
                    overflow-y: hidden;
                }

                .markdown-body {
                    background-color: 222.2 84% 4.9% !important;
                }
            </style>
            {#if $mode === "dark"}
                <link
                    rel="stylesheet"
                    href="../../node_modules/github-markdown-css/github-markdown-dark.css"
                />
            {:else}
                <link
                    rel="stylesheet"
                    href="../../node_modules/github-markdown-css/github-markdown-light.css"
                />
            {/if}
        </template>
    </zero-md>
</ScrollAreaWithProgress>
