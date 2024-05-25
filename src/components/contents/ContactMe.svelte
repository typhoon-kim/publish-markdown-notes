<script>
    import { Popover, PopoverContent, PopoverTrigger } from "$lib/components/ui/popover";
    import { Tooltip, TooltipContent, TooltipTrigger } from "$lib/components/ui/tooltip";
    import { ContactRound, Link, Mail } from "lucide-svelte";
    let className = undefined;
    export { className as class };
    export let contentClass = undefined;

    const links = [
        {
            name: "GitHub",
            url: "https://github.com/typhoon-kim/",
            logo: "/images/icons/github.svg",
        },
        /*
        {
            name: "IT Blog",
            url: "https://typhoon-kim.tistory.com/",
            logo: "/images/icons/tstory.svg",
        },
        {
            name: "HR Blog",
            url: "https://brunch.co.kr/@ss-yeon/",
            logo: "/images/icons/brunch.svg",
        },
        */
    ];
</script>
<Popover>
    <PopoverTrigger class={`${className}`}>
        <Tooltip openDelay={300}>
            <TooltipTrigger>
                <ContactRound />
            </TooltipTrigger>
            <TooltipContent>
                <p>Contact Hear!</p>
            </TooltipContent>
        </Tooltip>
    </PopoverTrigger>
    <PopoverContent class={`${contentClass}`} >
        <section class="flex flex-col contact">
            <div class="flex place-items-center">
                <Mail class="icon me-1" />
                <h1 class="font-bold">Mail: </h1>
                <ul class="flex">
                    <li class="flex px-1 py-0 place-items-center">
                        
                        <span class="ms-1">
                            <a href="mailto:typh007.kim@gmail.com">typh007.kim@gmail.com</a>
                        </span>
                    </li>
                </ul>
            </div>
            <div class="flex place-items-center mt-1">
                <Link class="icon me-1" />
                <h1 class="font-bold">Link: </h1>
                <ul class="flex">
                {#each links as link}
                    <li class="flex px-1 place-items-center">
                        <span class="logo-wrapper">
                            <img src={link.logo} alt={link.logo} />
                        </span>
                        <span class="ms-1">
                            <a href={link.url} target="_blank">{link.name}</a>
                        </span>
                    </li>
                {/each}
                </ul>
            </div>
        </section>
    </PopoverContent>
</Popover>