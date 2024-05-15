<script>
    import Separator from "$lib/components/ui/separator/separator.svelte";
    import MarkdownNote from "./MarkdownNote.svelte";

    // let noteList = [];
    // let noteList = ["http://localhost:5173/public/publish/note1.md"];
    let noteList = ["/publish/Adventurer/From plain-text note-taking.md", "/publish/Adventurer/From standard note-taking.md"];
    // let noteList = ["/public/publish/fixture.md", "http://localhost:5173/public/publish/note2.md", "/publish/Adventurer/From plain-text note-taking.md"];
</script>

<main class="main flex">
    {#if noteList.length == 0}
        <article>
            <h2 class="sr-only">노트없음</h2>
        </article>
    {:else if noteList.length == 1}
        <article class="note note-single">
            <h2 class="sr-only">노트</h2>
            <MarkdownNote src={noteList[0]} />
        </article>
    {:else if noteList.length == 2}
        <article class="note note-left">
            <h2 class="sr-only">왼쪽 노트</h2>
            <MarkdownNote src={noteList[0]} />
        </article>
        <Separator orientation="vertical" />
        <article class="note note-right">
            <h2 class="sr-only">오른쪽 노트</h2>
            <MarkdownNote src={noteList[1]} />
        </article>
    {:else}
        <article class="note note-left">
            <h2 class="sr-only">왼쪽 노트</h2>
            <MarkdownNote src={noteList[0]} />
        </article>
        <Separator orientation="vertical" />
        <article class="note note-right">
            <h2 class="sr-only">오른쪽 노트</h2>
            <MarkdownNote src={noteList[1]} />
        </article>
    {/if}
</main>
