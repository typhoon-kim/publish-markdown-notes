<script>
	import "./assets/scss/notebook.scss";
	import noteList from "./assets/data/note_list.json"
	import { ModeWatcher, setMode } from "mode-watcher";
	import Footer from "./components/layout/Footer.svelte";
	import Header from "./components/layout/Header.svelte";
	import Main from "./components/layout/Main.svelte";
    import { onMount } from "svelte";
    import Separator from "$lib/components/ui/separator/separator.svelte";
    import ZeroMd from "zero-md";
    import { currentNote } from "$store";
    import { writable } from "svelte/store";

	onMount( () => {
		if (!customElements.get("zero-md")) customElements.define("zero-md", ZeroMd);

		const hour = new Date().getHours();
		if (hour > 6 && hour <= 18) setMode("light"); else setMode("dark");

		setMode("light");
	});

	currentNote.set(noteList[0]);
</script>

<div class="wrapper">
	<ModeWatcher />
	<Header noteList={noteList} />
	<Separator orientation="vertical" />
	<Main noteList={noteList} />
	<Separator orientation="vertical" />
	<Footer />
</div>

<style></style>
