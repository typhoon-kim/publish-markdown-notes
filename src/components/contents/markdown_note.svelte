<script>
    import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "$lib/components/ui/breadcrumb";
    import ScrollAreaWithProgress from "$lib/components/ui/scroll-area-with-progress/scroll-area-with-progress.svelte";
    import { mode } from "mode-watcher";
    export let note;
	let className = undefined;
	export { className as class };

    const breadcrumb = note.route.split("/");
    const title = note.title.replace(".md", "");
</script>

<ScrollAreaWithProgress class={`h-full w-full ${className}`}>
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
    <zero-md class="markdown-body w-full" src={"publish" + note.route + "/" + note.title}>
        <script type="text/markdown">
            > [!CAUTION]
            > 😱 문서를 찾을 수 없습니다.
        </script>
        <template>
            <link rel="stylesheet" href={`/node_modules/github-markdown-css/github-markdown-${$mode}.css`} />
            <style>
                .markdown-body {
                    background-color: #00000000 !important;
                }
            </style>
        </template>
    </zero-md>
</ScrollAreaWithProgress>
