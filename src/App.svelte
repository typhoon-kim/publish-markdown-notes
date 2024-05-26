<script>
    import Router from "svelte-spa-router";
    import routes from "./routes";
	import { ModeWatcher, setMode } from "mode-watcher";
    import { onMount } from "svelte";
    import ZeroMd from "zero-md";

	onMount( () => {
		if (!customElements.get("zero-md")) customElements.define("zero-md", ZeroMd);

		const hour = new Date().getHours();
		if (hour > 6 && hour <= 18) setMode("light"); else setMode("dark");
	});
</script>
<ModeWatcher />
<Router {routes} restoreScrollState={true} />