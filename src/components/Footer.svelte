<script>
    import { Badge } from "$lib/components/ui/badge";
    import { Separator } from "$lib/components/ui/separator/index.js";
    import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
    import ContactMe from "./ContactMe.svelte";
    import { ArrowBigDown, ArrowDown } from "lucide-svelte";
</script>

<footer class="footer flex flex-col">
    <aside>
        <h3 class="sr-only">graph-view</h3>
        <canvas></canvas>
    </aside>
    <Separator class="my-3"/>
    <div>
        <h3 class="sr-only">Tag List</h3>
        <ul class="flex flex-row">
            <li class="mx-1"><Badge>Tag1</Badge></li>
            <li class="mx-1"><Badge>Tag2</Badge></li>
            <li class="mx-1"><Badge>Tag3</Badge></li>
        </ul>
    </div>
    <Separator class="my-3"/>
    <ScrollArea class="mt-3 grow">
        <nav>
            <h3 class="sr-only">Contents</h3>
            <ul>
                <li>outline 1</li>
                <li>outline 2</li>
                <li>outline 3</li>
            </ul>
        </nav>
    </ScrollArea>
    <Separator class="my-3"/>
    <ScrollArea class="mt-3 grow">
        <nav>
            <h3 class="sr-only">More ariticles</h3>
            <ul>
                <li>article 1</li>
                <li>article 2</li>
                <li>article 3</li>
            </ul>
        </nav>
    </ScrollArea>
    <Separator class="my-3"/>
    <section>
        <h3 class="sr-only">Author Information</h3>
        <ContactMe class="text-sm"/>
        <p class="mt-3 text-sm">Pep up <Badge class="h-4 pe-1">M<ArrowBigDown class="icon" /></Badge> by Typhoon.kim. 2024.</p>
        <h2 class='sr-only'>SITE INFO</h2>
        <p class="mt-3 bg-secondary rounded-md text-center text-sm">
            This site was created using<br/>
            <Badge class="h-4">Svelte</Badge> v.4.2.12, 
            <Badge class="h-4 ms-1">TailwindCSS</Badge> v.3.4.1, and 
            <Badge class="h-4 ms-1">Vite</Badge>.
        </p>
    </section>
</footer>
