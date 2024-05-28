<script>
    import Router from "svelte-spa-router";
    import routes from "./routes";
	import { ModeWatcher, setMode } from "mode-watcher";
    import { onMount } from "svelte";
    import CustomMarkdown from "./components/custom-elements/CustomMarkdown";

	onMount( () => {
		if (!customElements.get("custom-md")) customElements.define("custom-md", CustomMarkdown);

		const hour = new Date().getHours();
		if (hour > 6 && hour <= 18) setMode("light"); else setMode("dark");
	});
</script>
<ModeWatcher />
<Router {routes} restoreScrollState={true} />