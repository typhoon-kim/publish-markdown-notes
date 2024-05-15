<script>
	import "./assets/scss/notebook.scss";
	import { ModeWatcher, setMode } from "mode-watcher";
	import Footer from "./components/Footer.svelte";
	import Header from "./components/Header.svelte";
	import Main from "./components/Main.svelte";
    import { onMount } from "svelte";
    import Separator from "$lib/components/ui/separator/separator.svelte";

	onMount( () => {
		const hour = new Date().getHours();
		if (hour > 6 && hour <= 18) setMode("light");
		else setMode("dark");
	});
</script>

<div class="wrapper">
	<ModeWatcher />
	<Header />
	<Separator orientation="vertical" />
	<Main />
	<Separator orientation="vertical" />
	<Footer />
</div>

<style></style>
