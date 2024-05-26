<script>
	import "../assets/scss/notebook.scss"
    import Header from "../components/layout/Header.svelte";
    import Main from "../components/layout/Main.svelte";
    import Footer from "../components/layout/Footer.svelte";
    import Separator from "$lib/components/ui/separator/separator.svelte";
    import { location, querystring } from "svelte-spa-router";
    import { currentNote, leftNote, rightNote } from "$store";
    import { onMount } from "svelte";
    export let params;

    const updateNotes = () => {
        if ($location.startsWith("/index")) {
                leftNote.set(null);
                rightNote.set(null);
                currentNote.set(null);
        } else if ($location.startsWith("/book")) {
            if (params) {
                if (params.left) leftNote.set(params.left); else leftNote.set(null);
                if (params.right) rightNote.set(params.right); else rightNote.set(null);
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

<div class="hidden absolute bg-yellow-200 z-50">
    <p>The current page is: {$location}</p>
    <p>The querystring is: {$querystring}</p>
    <p>The params is: {params}
    {#if params}
        {#each Object.entries(params) as [key, value]}
            <br/>
            &gt; {key} : {value}
        {/each}
    {/if}
</div>
<div class="hidden absolute bg-yellow-200 z-50">
    <p>currentNote {$currentNote}</p>
    <p>leftNote {$leftNote}</p>
    <p>rightNote {$rightNote}</p>
</div>

<div class="wrapper">
	<Header />
	<Separator orientation="vertical" />
	<Main />
	<Separator orientation="vertical" />
	<Footer />
</div>