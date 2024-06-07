import metadata from '../public/data/metadata.json';
import { readable, writable } from "svelte/store";
export const notedata = readable(metadata.notedata, (set) => {
    set(metadata.notedata);
    return () => { };
});
export let currentNote = writable(null);
export let leftNote = writable(null);
export let rightNote = writable(null);
export function getNote(noteId) {
    return metadata.notedata.find((note) => note.id == noteId);
}

export function getRoute(leftId, rightId) {
    if (leftId && rightId) {
        return `/book/${leftId}/${rightId}`;
    }
    else if (leftId && !rightId) {
        return `/book/${leftId}`;
    }
    else return "/";
}

export const graphData = readable(metadata.graphdata, (set) => {
    set(metadata.graphdata);
    return () => { };
});

export function getGraphData(noteId) {
    const links = metadata.graphdata.links.filter((link) => link.source == noteId || link.target == noteId);
    const nodes = [];

    let tmpNode;
    nodes.push(metadata.graphdata.nodes.find((node) => node.id == noteId));

    for (const link of links) {
        if (noteId == link.source) {
            tmpNode = metadata.graphdata.nodes.find((node) => node.id == link.target);
            if (tmpNode.group == "note") tmpNode.group = "note-out";
            nodes.push(tmpNode);
        } else if (noteId == link.target) {
            tmpNode = metadata.graphdata.nodes.find((node) => node.id == link.source);
            if (tmpNode.group == "note") tmpNode.group = "note-in";
            nodes.push(tmpNode);
        }
    };

    return { links, nodes };
}