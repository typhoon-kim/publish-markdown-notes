<script>
    import MenuGroup from "./MenuGroup.svelte";
    import MenuItem from "./MenuItem.svelte";

    export let noteList;

    function createMenuData(notes) {
        const menu = {};

        notes.forEach((note) => {
            const pathParts = note.route.filter(Boolean); // 빈 부분 제거
            let currentLevel = menu;

            if (pathParts.length === 0) {
                // 최상위 루트 경로인 경우
                currentLevel["root"] = currentLevel["root"] || { notes: [] };
                currentLevel["root"].notes.push(note);
            } else {
                pathParts.forEach((part, index) => {
                    if (!currentLevel[part]) {
                        currentLevel[part] = {};
                    }
                    if (index === pathParts.length - 1) {
                        currentLevel[part].notes =
                            currentLevel[part].notes || [];
                        currentLevel[part].notes.push(note);
                    } else {
                        currentLevel = currentLevel[part];
                    }
                });
            }
        });

        return menu;
    }

    let menuData = createMenuData($noteList);
    const {root, ...otherMenu} = menuData;
    menuData = {...otherMenu, root};
</script>

{#each Object.keys(menuData) as key}
    {#if key === "root"}
        {#each menuData[key].notes as note}
            <MenuItem {note} />
        {/each}
    {/if}
    {#if key !== "root"}
        <MenuGroup header={key} items={menuData[key]} />
    {/if}
{/each}
