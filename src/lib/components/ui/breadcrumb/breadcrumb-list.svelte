<script>
	import { cn } from "$lib/utils.js";
	export let el = undefined;
	let className = undefined;
	export { className as class };
</script>

<ol
	bind:this={el}
	class={cn(
		"flex flex-wrap items-center gap-0.5 break-words text-sm text-muted-foreground sm:gap-0.5",
		className
	)}
	{...$$restProps}
>
	<slot />
</ol>
