<script>
    import { toggleMode, systemPrefersMode, userPrefersMode, mode, setMode } from "mode-watcher";
    import Button from "$lib/components/ui/button/button.svelte";
    import Switch from "$lib/components/ui/switch/switch.svelte";
    import Label from "$lib/components/ui/label/label.svelte";
    import { MoonStar, Sun } from "lucide-svelte";
    let className = undefined;
    export { className as class };
</script>

<section class={`text-xs w-fit h-fit relative ${className}`}>
    <h2 class="hidden">테마변경</h2>

    {#if $mode == "light"}
        <Button 
            class="absolute z-10 end-1 mt-1"
            variant="link" size="xs" 
            on:click={() => setMode("dark")}
            >
            <Label class="cursor-pointer hidden">Light</Label>
            <Sun class="icon text-primary" />
        </Button>
    {/if}

    <Switch
        class="h-6 w-12 "
        on:click={toggleMode}
        checked={$mode === "dark"}
    />

    {#if $mode == "dark"}
        <Button class="absolute z-10 start-1 mt-1"
            variant="link" size="xs" 
            on:click={() => setMode("light")}
            >
            <Label class="cursor-pointer hidden">Dark</Label>
            <MoonStar class="icon text-primary-foreground" />
        </Button>
    {/if}

    {#if import.meta.env.DEV}
        <div class="hidden">
            <p>Your preferred mode is: {$userPrefersMode}</p>
            <p>The system prefers mode is: {$systemPrefersMode}</p>
            <p>current mode is: {$mode}</p>
        </div>
    {/if}
</section>
