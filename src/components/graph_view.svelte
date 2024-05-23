<script>
    import { onMount } from "svelte";
    import noteData from "../assets/data/note_test.json";
    import tagData from "../assets/data/tag_test.json";
    import * as d3 from "d3";

    let graphId;
    export {graphId as id};

    let graph;

    function drawGraph(width, height) {
        const nodes = [];
        const links = [];

        // Add notes as nodes
        noteData.forEach((note) => {
            nodes.push({ id: note.id, title: note.title, group: "note", url: "google.com" });
            note.links.forEach((link) => {
                links.push({ source: note.id, target: link });
            });
        });

        // Add tags as nodes and connect them to notes
        tagData.forEach((tag) => {
            nodes.push({ id: tag.tag, title: tag.tag, group: "tag", url: "naver.com" });
            tag.notes.forEach((noteId) => {
                links.push({ source: tag.tag, target: noteId });
            });
        });

        console.log(nodes);
        console.log(links);

        const svg = d3.select(`#${graphId}`)
            .attr("viewBox", `0 0 ${width} ${height}`)
            .attr("preserveAspectRatio", "xMidYMid meet")

        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id((d) => d.id).distance(100))
            .force("charge", d3.forceManyBody().strength(-300))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .on("tick", ticked);

        const link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(links)
            .enter()
            .append("line")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6);

        const node = svg.append("g")
            .attr("class", "nodes")
            .selectAll("g")
            .data(nodes)
            .enter()
            .append("g")
            .attr("class", "node")
            .call(d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended))
            .on("click", (event, d) => {
                if (d.url) {
                    window.location.href = d.url;
                }
            });

        node.append("circle")
            .attr("r", 5)
            .attr("fill", "#7f00ff")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5);

        node.append("text")
            .text((d) => d.title)
            .attr("x", 6)
            .attr("y", 3)
            .style("font", "10px sans-serif")
            .style("pointer-events", "none")
            .style("text-anchor", "middle");

        function ticked() {
            link.attr("x1", (d) => d.source.x)
                .attr("y1", (d) => d.source.y)
                .attr("x2", (d) => d.target.x)
                .attr("y2", (d) => d.target.y);

            node.attr("transform", (d) => `translate(${d.x},${d.y})`);
        }

        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }
    }

    onMount(() => {
        const width = graph.clientWidth;
        const height = graph.clientHeight;

        console.log(graph);

        drawGraph(width, height);
    });
</script>
<svg width="100%" height="100%" id={graphId} bind:this={graph}></svg>