<script>
    import logotmp from "../assets/images/logo_tmp.jpg";
	import { toggleMode, systemPrefersMode, userPrefersMode, mode } from "mode-watcher";
    import { Sun, Moon, MoonStar } from "lucide-svelte";
    import Switch from "$lib/components/ui/switch/switch.svelte";
    import * as Command from "$lib/components/ui/command";
    import * as Collapsible from "$lib/components/ui/collapsible";
    import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
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
            <li>Svelte 시작하기</li>
            <li>
                <ul>
                    <li>스벨트 소개 및 환경세팅</li>
                    <li>선언적 렌더링</li>
                    <li>조건문과 반복문</li>
                    <li>이벤트 핸들링</li>
                    <li>컴포넌트</li>
                    <li>스토어</li>
                    <li>실습</li>
                </ul>
            </li>
            <li>React 시작하기</li>
            <li>
                <ul>
                    <li>React</li>
                    <li>JSX</li>
                    <li>React Elements</li>
                    <li>Components and Props</li>
                    <li>State and Lifecycle</li>
                    <li>Hooks</li>
                    <li>Events</li>
                    <li>Conditinal Rendering</li>
                    <li>List and Key</li>
                </ul>
            </li>
            <li>웹 프론트엔드 시리즈</li>
            <li>
                <ul>
                    <li>주관적인 웹 프론트엔드의 발전</li>
                    <li>
                        모던 프론트엔드 프레임워크(과거편) AngularJS, Ember,
                        Backbone
                    </li>
                    <li>
                        모던 프론트엔드 프레임워크(현재편) Angular, React, Vue
                    </li>
                    <li>
                        모던 프론트엔드 프레임워크(미래편) Svelte, Solid, Qwik
                    </li>
                </ul>
            </li>
        </ul>
    </ScrollArea>
</header>
