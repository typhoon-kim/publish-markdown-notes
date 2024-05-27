<script>
	import "../assets/scss/notebook.scss"
    import Header from "../components/layout/Header.svelte";
    import Main from "../components/layout/Main.svelte";
    import Footer from "../components/layout/Footer.svelte";
    import Separator from "$lib/components/ui/separator/separator.svelte";
    import { location, querystring, replace } from "svelte-spa-router";
    import { currentNote, leftNote, rightNote } from "$store";
    import { onMount } from "svelte";
    export let params;

    const updateNotes = () => {
        if ($location.startsWith("/index")) {
                leftNote.set(null);
                rightNote.set(null);
                currentNote.set(null);
        } else if($location === "/book") {
            replace("/");
        } else if ($location.startsWith("/book")) {
            if (params) {
                if (params.right) {
                    rightNote.set(params.right);
                    if (!$currentNote) $currentNote = params.right;
                } else {
                    rightNote.set(null);
                }

                if (params.left) {
                    leftNote.set(params.left);
                    if (!$currentNote) $currentNote = params.left;
                } else {
                    leftNote.set(null);
                }
            }
        } else {
            $leftNote = null;
            $rightNote = null;
            $currentNote = null;
        }
    }

    onMount(updateNotes);
    $: params, updateNotes();
    $: $location, updateNotes();
</script>

{#if import.meta.env.DEV}
    <div class="hidden absolute right-0 bottom-0 z-50">
        <p>The current page is: {$location}</p>
        <p>The querystring is: {$querystring}</p>
        <p>The params is: {params}
        {#if params}
            {#each Object.entries(params) as [key, value]}
                <br/>
                &gt; {key} : {value}
            {/each}
        {/if}
        <br/>
        <p>currentNote {$currentNote}</p>
        <p>leftNote {$leftNote}</p>
        <p>rightNote {$rightNote}</p>
    </div>
{/if}

<div class="wrapper">
	<Header />
	<Separator orientation="vertical" />
	<Main />
	<Separator orientation="vertical" />
	<Footer />
</div>