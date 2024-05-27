<script>
    import { CircleX, ArrowBigDown, Waypoints } from "lucide-svelte";
    import { CommandEmpty, CommandInput, CommandList, Root as CommandRoot } from "$lib/components/ui/command";
    import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";
    import Menu from "../contents/menu/Menu.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import ContactMe from "../contents/ContactMe.svelte";
    import Badge from "$lib/components/ui/badge/badge.svelte";
    import FullDialog from "../contents/FullDialog.svelte";
    import GraphView from "../GraphView.svelte";
    import { noteList } from "$store";
    import ToggleTheme from "../ToggleTheme.svelte";

    let search = undefined;
</script>

<header class="header flex flex-col">
    <ToggleTheme class="place-self-end" />

    <section class="place-self-center flex flex-col max-w-full">
        <img class="logo place-self-center" src="/logo.jpg" alt="로고" />
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
                <FullDialog class="" title="Graph View" tooltip="Graph View" tooltipAlign="right">
                    <Waypoints slot="button-icon" />
                    <GraphView id="graph-full" tagSwitch />
                </FullDialog>
            </div>
            <hr />
            <ScrollArea class="grow h-0 mt-1" contentClass="h-full">
                <div class="flex flex-col h-full">
                    <CommandList class= "grow">
                        <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
                        <Menu {noteList}/>
                    </CommandList>
                    <hr class="my-1"/>
                    <section class="mt-2">
                        <h2 class='hidden'>SITE INFO</h2>
                        <div class="bg-secondary rounded-lg text-center font-light text-xs py-1">
                            <p class="h-5">This site was created using</p>
                            <p class="h-5">
                                <Badge class="font-thin h-4 px-2 bg-primary text-primary-foreground" href="https://svelte.dev/" variant="link">Svelte</Badge> v.4.2.12, 
                                <Badge class="font-thin h-4 px-2 bg-primary text-primary-foreground ms-1" href="https://tailwindcss.com/">Tailwind</Badge> v.3.4.1</p>
                            <p class="h-5">Pep up <Badge class="font-thin h-4 pe-1">M<ArrowBigDown class="h-4" /></Badge> by Typhoon.kim. 2024.</p>
                        </div>
                    </section>
                </div>
            </ScrollArea>
        </CommandRoot>
    </section>
</header>
