<script>
    import { toggleMode, systemPrefersMode, userPrefersMode, mode } from "mode-watcher";
    import { Sun, MoonStar, CircleX } from "lucide-svelte";
    import Switch from "$lib/components/ui/switch/switch.svelte";
    import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
    import Label from "$lib/components/ui/label/label.svelte";
    import Menu from "./menu.svelte";
    import { CommandEmpty, CommandInput, CommandList, Root as CommandRoot } from "$lib/components/ui/command";
    import Button from "$lib/components/ui/button/button.svelte";

    export let noteList;

    let search = "";
</script>

<header class="header flex flex-col">
    <section class="mt-2 place-self-center flex flex-col">
        <img class="logo place-self-center" src="/logo_tmp.jpg" alt="로고" />
        <h1 class="text-center">Typhoon's Log</h1>
    </section>

    <section class="flex mt-3 place-self-end text-xs px-2">
        <h2 class="sr-only">테마변경</h2>
        <Label class="flex">Light <Sun class="icon" /></Label>
        <Switch class="mx-2 h-4 w-9" on:click={toggleMode} checked={$mode === "dark"} />
        <Label class="flex">Dark <MoonStar class="icon" /></Label>

        <div class="sr-only">
            <p>Your preferred mode is: {$userPrefersMode}</p>
            <p>The system prefers mode is: {$systemPrefersMode}</p>
            <p>current mode is: {$mode}</p>
        </div>
    </section>

    <section class="grow pb-2 mt-3">
        <h2 class="sr-only">노트</h2>
        <CommandRoot class="flex w-full">
            <div class="relative">
                <CommandInput bind:value={search} placeholder="노트 검색" />
                {#if search !== ""}
                    <Button
                        size="icon"
                        variant="link"
                        class="absolute top-0.5 end-0 text-muted-foreground"
                        on:click={ () => search = "" }
                    >
                    <CircleX class="h-4 w-4" />
                    </Button>
                {/if}
            </div>
            <ScrollArea class="grow h-0 mt-3">
                <CommandList>
                    <CommandEmpty>No results found.
                    </CommandEmpty>
                    <Menu noteList={noteList}/>
                </CommandList>
            </ScrollArea>
        </CommandRoot>
    </section>
</header>
