<script lang="ts">
    import { link } from 'svelte-spa-router';
    import { CardHeader, Card, CardTitle, CardDescription, CardContent, CardFooter } from "$lib/components/ui/card";
    import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "$lib/components/ui/breadcrumb";
    import Badge from "$lib/components/ui/badge/badge.svelte";
    import Separator from "$lib/components/ui/separator/separator.svelte";
    import { Tags } from "lucide-svelte";

    export let note;
</script>
{#if note}
    <Card class="grow mx-10 my-6 py-4">
        <CardHeader class="py-0">
            <CardDescription class="flex w-full">
                <Breadcrumb>
                    <BreadcrumbList>
                        {#each note.route as item, idx}
                            {#if item}
                            <BreadcrumbItem>
                                <BreadcrumbLink 
                                    href={`/#/index?category=${note.route.slice(0, idx + 1).join("/")}`}
                                    >
                                    {item}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            {/if}
                        {/each}
                    </BreadcrumbList>
                </Breadcrumb>
                <p class="grow text-end">
                    {`${new Date(note.created).toLocaleString()}`}
                </p>
            </CardDescription>
            <Separator />
            <CardTitle class="text-2xl border-s-4 ps-2">
                <a href={`/book/${note.id}`} use:link>{note.name}</a>
            </CardTitle>
        </CardHeader>
        <CardContent class="flex py-2 place-items-center mt-2">
            <div class=" flex flex-col place-content-center pe-4 grow">
                <div class="grow">
                    {note.summary}
                </div>
            </div>
            {#if note.images && note.images.length > 0}
                <img class="w-40 ps-4 shrink" src={note.images[0]} alt="thumbnail">
            {/if}
        </CardContent>
        {#if note.tags && note.tags.length > 0}
        <CardFooter class="flex">
            <Tags class="me-1 shrink-0" />
            <ul class="flex place-self-start flex-wrap">
                {#each note.tags as tag}
                    <li class="m-0.5">
                        <Badge><a href={`/index?tag=${tag}`} use:link>{tag}</a></Badge>
                    </li>
                {/each}
            </ul>
        </CardFooter>
        {/if}
    </Card>
{/if}