<script>
	import { Command as CommandPrimitive } from "cmdk-sv";
	import { cn } from "$lib/utils.js";
	let className = undefined;
	export { className as class };
</script>

<CommandPrimitive.List
	class={cn("overflow-y-auto overflow-x-hidden", className)}
	{...$$restProps}
>
	<slot />
</CommandPrimitive.List>
