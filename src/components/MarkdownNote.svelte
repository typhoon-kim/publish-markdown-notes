<script>
    import ZeroMd from "zero-md";
    import { mode } from "mode-watcher";
    import { onMount } from "svelte";

    export let src;

    function getMode() {
        console.log(mode);
        console.log($mode);
    }

    onMount(() => {
        customElements.define("zero-md", ZeroMd);
    });
</script>

<zero-md class="markdown-body" {src}>
    <template>
        <style>
            * {
                max-width: 100%;
                overflow-x: auto;
                overflow-y: hidden;
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
