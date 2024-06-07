<script>
    import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "$lib/components/ui/breadcrumb";
    import ScrollAreaWithProgress from "$lib/components/ui/scroll-area-with-progress/scroll-area-with-progress.svelte";
    import { mode } from "mode-watcher";
    export let note;
    let className = undefined;
    export { className as class };
    
</script>

<ScrollAreaWithProgress class={`h-full w-full ${className}`}>
    {#if note}
        <Breadcrumb class="px-4">
            <BreadcrumbList>
                {#each note.route as item, idx}
                    {#if item}
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                href={`/#/index?category=${note.route.slice(0, idx + 1).join("/")}`}
                            >
                                {item}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    {/if}
                {/each}
                <BreadcrumbItem>
                    <BreadcrumbPage>{note.name}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <h1 class="text-4xl my-1 font-extrabold p-2">{note.name}</h1>
        <custom-md
            id={note.id}
            class="markdown-body w-full"
            src={`publish/${note.route.join("/")}/${note.name}.md`}
            theme={$mode}
        >
            <script type="text/markdown">
                > [!CAUTION]
                > 😱 문서를 찾을 수 없습니다.
            </script>
        </custom-md>
    {:else}
        <custom-md class="markdown-body w-full" theme={$mode}>
            <script type="text/markdown">
                > [!CAUTION]
                > 😱 문서를 찾을 수 없습니다.
            </script>
            <template>
                <style>
                    .markdown-body {
                        background-color: #00000000 !important;
                        transition: all 0.3s ease-in-out;
                    }
                </style>
                <link
                    rel="stylesheet"
                    href={`/node_modules/github-markdown-css/github-markdown-${$mode}.css`}
                />
            </template>
        </custom-md>
    {/if}
</ScrollAreaWithProgress>
