<script>
    import { onMount, afterUpdate } from "svelte";
    import * as d3 from "d3";
    import Switch from "$lib/components/ui/switch/switch.svelte";
    import Label from "$lib/components/ui/label/label.svelte";
    import { mode } from "mode-watcher";
    let graphId;
    export {graphId as id};
    export let data;
    export let showTags = true;
    export let tagSwitch = false;

    let graph;
    let zoomLevel = 1;
    
    function drawGraph(width, height) {
        
        /* 1. 데이터 세팅 */
        let nodes = data.nodes;
        let links = data.links;

        // 태그그룹 제외
        if (!showTags) {
            nodes = nodes.filter(node => {return node.group !== "tag"});
            links = links.filter(link => {return link.group !== "tag"});
        }

        /* 2. 노드 설정 */
        const svg = d3.select(`#${graphId}`)
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height])

        svg.selectAll("*").remove();

        const zoom = d3.zoom()
            .scaleExtent([0.5, 5])
            .on("zoom", (event) => {
                g.attr("transform", event.transform);
                zoomLevel = event.transform.k;
                g.selectAll("text").style("display", zoomLevel > 1.5 ? "block" : "none");

                // Adjust the repulsion strength based on zoom level
                const newStrength = -150 * (event.transform.k * 1.5); // Example scaling factor
                simulation.force("charge").strength(newStrength);

                // Adjust link distance based on zoom level
                const newLinkDistance = 150 * (event.transform.k * 1.5); // Example scaling factor
                simulation.force("link").distance(newLinkDistance);

                simulation.alpha(1).restart(); // Reheat the simulation to apply changes
            });

        svg.call(zoom);

        let themeStroke = "rgba(2, 8, 23, 0.87)";
        if ($mode === "dark") {
            themeStroke = "rgba(248, 250, 252, 0.87)";
        }

        const color = d3.scaleOrdinal(["tag", "note", "note-in", "note-out"], ["#7574C2", "currentColor", "currentColor", "currentColor"]);

        const g = svg.append("g");

        const link = g.append("g")
            .attr("stroke", themeStroke)
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(links)
            .join("line");

        const node = g.append("g")
            .attr("stroke", themeStroke)
            .attr("stroke-width", 1)
            .selectAll("g")
            .data(nodes)
            .join("g")
            .call(d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended))
            .on("click", (e, d) => {
                if (d.url) {
                    window.location.href = d.url;
                }
            })
            .on("mouseover", (e, d) => {
                d3.select(e.currentTarget).select("text").style("display", "block");
            })
            .on("mouseleave", (e, d) => {
                if (zoomLevel <= 1.5) {
                    d3.select(e.currentTarget).select("text").style("display", "none");
                }
            });

        node.append("circle")
            .attr("r", 10)
            .attr("fill", d => color(d.group))
            .style("cursor", "pointer");

        node.append("text")
            .text((d) => d.title)
            .attr("y", 20)
            .style("font-size", "0.5rem")
            .style("text-anchor", "middle")
            .style("display", "none")
            .style("cursor", "pointer")
            .attr("class", "text-muted-foreground text-xs font-light");

        /* 3. 시뮬레이션 설정 */
        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id((d) => d.id).distance(150))
            .force("collide", d3.forceCollide().radius(10))
            .force("charge", d3.forceManyBody().strength(-150)) // Initial repulsion strength
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("x", d3.forceX())
            .force("y", d3.forceY());

        /* 4. 시뮬레이션 업데이트 */
        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);
            node
                .attr("transform", d => `translate(${d.x}, ${d.y})`);
        });

        /* 5. 드래그 이벤트 */

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
        drawGraph(graph.clientWidth, graph.clientHeight);
    });

    afterUpdate(() => {
        drawGraph(graph.clientWidth, graph.clientHeight);
    })
</script>
{#if tagSwitch}
    <div class="absolute bottom-4">
        <Label class="text-base">태그</Label> <Switch bind:checked={showTags} />
    </div>
{/if}
<svg width="100%" height="100%" id={graphId} bind:this={graph}></svg>