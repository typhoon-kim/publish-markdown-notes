<script>
    import { onMount, afterUpdate } from "svelte";
    import tagList from "../assets/data/tag_list.json";
    import noteList from "../assets/data/note_list.json";
    import linkList from "../assets/data/link_list.json";
    import * as d3 from "d3";
    import Switch from "$lib/components/ui/switch/switch.svelte";
    import Label from "$lib/components/ui/label/label.svelte";
    import { mode } from "mode-watcher";
    import { getRoute } from "$store";

    export {graphId as id};
    export let showTags = true;
    export let tagSwitch = false;
   
    let graph;
    let graphId;

    /** todo 노트검색 수정 필요*/
    function getNoteIdByTitle(title) {
        const noteData = noteList.filter((note) => {
            return note.name == title;
        });
        
        // console.log(title)
        // console.log(noteData);

        if (noteData.length == 0) return null;
        else return noteData[0].id;
    }

    function drawGraph(width, height) {
        const nodes = [];
        const links = [];

        // add tag nodes
        if (showTags)
        tagList.forEach(tag => {
            nodes.push({
                id: tag,
                title: tag,
                group: "tag",
                url: `/#/index?tag=${tag}`
            })
        });

        // add note nodes
        noteList.forEach(note => {
            nodes.push({
                id: note.id,
                title: note.name,
                group: "note",
                url: `/#${getRoute(note.id)}`
            })

            // add tag to note links
            if (showTags)
            note.tags.forEach(tag => {
                links.push({ source: tag, target: note.id });
            })
        });

        linkList.forEach(link => {
            const targetNoteId = getNoteIdByTitle(link.url);
            if (targetNoteId) links.push({ source: link.from, target: targetNoteId});
        });

        // Specify the color scale.
        // const color = d3.scaleOrdinal(d3.schemeCategory10);
        
        let themeColor = "rgb(248, 250, 252)";
        let themeStroke = "rgba(2, 8, 23, 0.87)";
        if ($mode === "dark") {
            themeColor = "rgb(2, 8, 23)";
            themeStroke = "rgba(248, 250, 252, 0.87)";
        }
        const color = d3.scaleOrdinal(["tag", "note"], ["#7574C2", themeColor]);

        const svg = d3.select(`#${graphId}`)
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height])

        svg.selectAll("*").remove();

        const zoom = d3.zoom()
            .scaleExtent([0.1, 10])
            .on("zoom", (event) => {
                g.attr("transform", event.transform);
                g.selectAll("text").style("display", event.transform.k > 1.5 ? "block" : "none");

                // Adjust the repulsion strength based on zoom level
                const newStrength = -30 * (event.transform.k * 1.5); // Example scaling factor
                simulation.force("charge").strength(newStrength);

                // Adjust link distance based on zoom level
                const newLinkDistance = 30 * (event.transform.k * 1.5); // Example scaling factor
                simulation.force("link").distance(newLinkDistance);

                simulation.alpha(1).restart(); // Reheat the simulation to apply changes
            });

        svg.call(zoom);

        const g = svg.append("g");

        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id((d) => d.id).distance(30))
            .force("charge", d3.forceManyBody().strength(-30)) // Initial repulsion strength
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("x", d3.forceX())
            .force("y", d3.forceY())

        const link = g.append("g")
            .attr("stroke", themeStroke)
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(links)
            .join("line")
            .attr("stroke-width", d => Math.sqrt(d.value));

        const node = g.append("g")
            .attr("stroke", themeStroke)
            .attr("stroke-width", 1)
            .selectAll("g")
            .data(nodes)
            .join("g")
            .call(d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended))
            .on("click", (event, d) => {
                if (d.url) {
                    window.location.href = d.url;
                }
            });

        node.append("circle")
            .attr("r", 5)
            .attr("fill", d => color(d.group));

        node.append("text")
            .text((d) => d.title)
            .attr("y", 12)
            .style("font-size", "0.5rem")
            .style("text-anchor", "middle")
            .style("display", "none")
            .attr("class", "text-muted-foreground text-xs font-light");

        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);
            node
                .attr("transform", d => `translate(${d.x}, ${d.y})`);
        });

        // Reheat the simulation when drag starts, and fix the subject position.
        function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }

        // Update the subject (dragged node) position during drag.
        function dragged(event) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }

        // Restore the target alpha so the simulation cools after dragging ends.
        // Unfix the subject position now that it’s no longer being dragged.
        function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }
    }

    onMount(() => {
        const width = graph.clientWidth;
        const height = graph.clientHeight;

        // console.log(graph);

        drawGraph(width, height);
    });

    afterUpdate(() => {

        const width = graph.clientWidth;
        const height = graph.clientHeight;

        drawGraph(width, height);
    })

</script>
{#if tagSwitch}
    <Label>태그<Switch class="mx-2 h-4 w-9" bind:checked={showTags} /></Label>
{/if}
<svg width="100%" height="100%" id={graphId} bind:this={graph}></svg>