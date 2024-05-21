<script>
    import ScrollAreaWithProgress from "$lib/components/ui/scroll-area-with-progress/scroll-area-with-progress.svelte";
    import { mode } from "mode-watcher";
    export let note;
</script>

<ScrollAreaWithProgress class="h-full w-full">
    <h1 class="text-2xl">{note.title}</h1>
    <zero-md class="markdown-body w-full" src={note.route + "/" + note.title}>
        <template>
            <style>
                * {
                    max-width: 100%;
                    overflow-x: auto;
                    overflow-y: hidden;
                }

                .markdown-body {
                    background-color: inherit !important;
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
