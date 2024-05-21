<script>
    import logotmp from "../assets/images/logo_tmp.jpg";
    import {
        toggleMode,
        systemPrefersMode,
        userPrefersMode,
        mode,
    } from "mode-watcher";
    import { Sun, Moon, MoonStar } from "lucide-svelte";
    import Switch from "$lib/components/ui/switch/switch.svelte";
    import * as Command from "$lib/components/ui/command";
    import * as Collapsible from "$lib/components/ui/collapsible";
    import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";

    export let noteList;
</script>

<header class="header flex flex-col">
    <div class="flex mt-3 place-self-end">
        <h2 class="sr-only">테마변경</h2>
        <span class="flex">Light <Sun class="icon" /></span>
        <Switch class="mx-2" on:click={toggleMode} checked={$mode === "dark"} />
        <span class="flex">Dark <MoonStar class="icon" /></span>
    </div>
    <div class="sr-only">
        <p>Your preferred mode is: {$userPrefersMode}</p>
        <p>The system prefers mode is: {$systemPrefersMode}</p>
        <p>current mode is: {$mode}</p>
    </div>
    <img class="mt-3 logo place-self-center" src={logotmp} alt="로고" />
    <h1 class="mt-3 text-center">Typhoon's Log</h1>
    <div>
        <h2 class="sr-only">노트검색</h2>
        <Command.Root class="w-full">
            <Collapsible.Root>
                <Collapsible.Trigger>
                    <Command.Input placeholder="노트 검색" />
                </Collapsible.Trigger>
                <Collapsible.Content>
                    <Command.List>
                        <Command.Empty>No results found.</Command.Empty>
                        <Command.Group heading="Suggestions">
                            <Command.Item>Calendar</Command.Item>
                            <Command.Item>Search Emoji</Command.Item>
                            <Command.Item>Calculator</Command.Item>
                        </Command.Group>
                        <Command.Separator />
                        <Command.Group heading="Settings">
                            <Command.Item>Profile</Command.Item>
                            <Command.Item>Billing</Command.Item>
                            <Command.Item>Settings</Command.Item>
                        </Command.Group>
                    </Command.List>
                </Collapsible.Content>
            </Collapsible.Root>
        </Command.Root>
    </div>

    <ScrollArea class="mt-3 rounded-md border grow">
        <ul>
            {#each noteList as note}
                <li>{note.title}</li>
            {/each}
        </ul>
    </ScrollArea>
</header>
