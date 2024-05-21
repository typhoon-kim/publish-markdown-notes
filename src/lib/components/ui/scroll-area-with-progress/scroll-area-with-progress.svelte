<script>
	import { onMount } from "svelte";
	import { Progress as ProgressPrimitive, ScrollArea as ScrollAreaPrimitive } from "bits-ui";
	import { Scrollbar } from "./index.js";
	import { cn } from "$lib/utils.js";

	let className = undefined;
	export { className as class };
	export let orientation = "vertical";
	export let scrollbarXClasses = "";
	export let scrollbarYClasses = "";
	export let max = 100;
	let value = 0;  // Default to 0 initially

	// Elements references
	let viewport;
	let content;

	// Function to update progress based on scroll
	const updateProgress = () => {
		if (orientation === "vertical") {
			const totalHeight = content.scrollHeight - viewport.clientHeight;
			value = (viewport.scrollTop / totalHeight) * max;
		} else if (orientation === "horizontal") {
			const totalWidth = content.scrollWidth - viewport.clientWidth;
			value = (viewport.scrollLeft / totalWidth) * max;
		}
	};

	// Attach scroll event listener
	onMount(() => {
		if (viewport) {
			viewport.addEventListener('scroll', updateProgress);
		}

		return () => {
			if (viewport) {
				viewport.removeEventListener('scroll', updateProgress);
			}
		};
	});
</script>

<ScrollAreaPrimitive.Root {...$$restProps} class={cn("relative overflow-hidden", className)}>
	<ProgressPrimitive.Root
		class={cn("relative h-1 w-full overflow-hidden rounded-full bg-secondary mb-4")}
		{...$$restProps}
	>
		<div
			class="h-full w-full flex-1 bg-primary transition-all"
			style={`transform: translateX(-${100 - (100 * (value ?? 0)) / (max ?? 1)}%)`}
		></div>
	</ProgressPrimitive.Root>
	<ScrollAreaPrimitive.Viewport bind:el={viewport} class="h-full w-full rounded-[inherit]">
		<ScrollAreaPrimitive.Content bind:el={content} style="display:block">
			<slot />
		</ScrollAreaPrimitive.Content>
	</ScrollAreaPrimitive.Viewport>
	{#if orientation === "vertical" || orientation === "both"}
		<Scrollbar orientation="vertical" class={scrollbarYClasses}/>
	{/if}
	{#if orientation === "horizontal" || orientation === "both"}
		<Scrollbar orientation="horizontal" class={scrollbarXClasses} />
	{/if}
	<ScrollAreaPrimitive.Corner />
</ScrollAreaPrimitive.Root>
