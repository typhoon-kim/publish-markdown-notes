<script>
    import { toggleMode, systemPrefersMode, userPrefersMode, mode, setMode } from "mode-watcher";
    import { Sun, MoonStar, CircleX, ArrowBigDown, Waypoints } from "lucide-svelte";
    import { CommandEmpty, CommandInput, CommandList, Root as CommandRoot } from "$lib/components/ui/command";
    import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";
    import Switch from "$lib/components/ui/switch/switch.svelte";
    import Label from "$lib/components/ui/label/label.svelte";
    import Menu from "../contents/menu/menu.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import ContactMe from "../contents/contact_me.svelte";
    import Badge from "$lib/components/ui/badge/badge.svelte";
    import FullDialog from "../contents/full_dialog.svelte";
    import GraphView from "../graph_view.svelte";

    export let noteList;
    let search = undefined;
</script>

<header class="header flex flex-col">
    <section class="flex my-1 place-self-end text-xs px-2">
        <h2 class="hidden">테마변경</h2>
        <Button variant="link" size="xs" on:click={()=> setMode("light")}><Label class="flex cursor-pointer">Light <Sun class="icon" /></Label></Button>
        <Switch class="mx-2 h-4 w-9" on:click={toggleMode} checked={$mode === "dark"} />
        <Button variant="link" size="xs" on:click={()=> setMode("dark")}><Label class="flex cursor-pointer">Dark <MoonStar class="icon" /></Label></Button>

        <div class="hidden">
            <p>Your preferred mode is: {$userPrefersMode}</p>
            <p>The system prefers mode is: {$systemPrefersMode}</p>
            <p>current mode is: {$mode}</p>
        </div>
    </section>

    <section class="mt-1 place-self-center flex flex-col max-w-full">
        <img class="logo place-self-center" src="/logo_tmp.jpg" alt="로고" />
        <div class="flex place-items-baseline">
            <a class="title text-center" href="/">Typhoon's Log</a>
            <ContactMe class="ms-1" contentClass="text-sm"/>
        </div>
    </section>

    <section class="grow mt-1">
        <h2 class="hidden">노트</h2>
        <CommandRoot class="w-full">
            <div class="flex place-items-center">
                <CommandInput class="grow" bind:value={search} placeholder="노트 검색" />
                <Button size="icon" variant="link" class={`${!search && "invisible"} text-muted-foreground`} on:click={ () => search = "" } >
                    <CircleX class="h-4 w-4" />
                </Button>
                <FullDialog open class="" title="Graph View (All)" tooltip="Graph View" tooltipAlign="right">
                    <Waypoints slot="button-icon" />
                    <GraphView id="graph-full" tagSwitch />
                </FullDialog>
            </div>
            <hr />
            <ScrollArea class="grow h-0 mt-1">
                <CommandList>
                    <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
                    <Menu noteList={noteList}/>
                </CommandList>
            </ScrollArea>
        </CommandRoot>
    </section>
    <hr class="my-1"/>
    <section>
        <h2 class='hidden'>SITE INFO</h2>
        <div class="bg-secondary rounded-lg text-center font-light text-xs py-1">
            <p class="h-5">This site was created using</p>
            <p class="h-5">
                <Badge class="font-thin h-4 px-2 bg-primary text-primary-foreground" href="https://svelte.dev/" variant="link">Svelte</Badge> v.4.2.12, 
                <Badge class="font-thin h-4 px-2 bg-primary text-primary-foreground ms-1" href="https://tailwindcss.com/">Tailwind</Badge> v.3.4.1</p>
            <p class="h-5">Pep up <Badge class="font-thin h-4 pe-1">M<ArrowBigDown class="h-4" /></Badge> by Typhoon.kim. 2024.</p>
        </div>
    </section>
</header>
