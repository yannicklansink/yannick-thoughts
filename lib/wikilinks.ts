import type { Plugin } from "unified";
import type { Node, Parent } from "unist";
import { visit } from "unist-util-visit";

interface TextNode extends Node {
  type: "text";
  value: string;
}

const WIKI_RE = /\[\[([a-zA-Z0-9-_\/]+)\]\]/g;

export const remarkWikiLinks: Plugin = () => {
  return (tree: Node) => {
    visit(tree, "text", (node: TextNode, index: number | undefined, parent: Parent | undefined) => {
      if (index === undefined || !parent) return;

      const value = node.value;
      if (!value.includes("[[")) return;

      const parts: Node[] = [];
      let last = 0;

      for (const m of value.matchAll(WIKI_RE)) {
        const start = m.index ?? 0;
        const end = start + m[0].length;
        const slug = m[1];

        if (start > last) {
          parts.push({ type: "text", value: value.slice(last, start) } as TextNode);
        }

        parts.push({
          type: "link",
          url: `/${slug}`,
          children: [{ type: "text", value: slug }],
        } as Node);

        last = end;
      }

      if (last < value.length) {
        parts.push({ type: "text", value: value.slice(last) } as TextNode);
      }

      if (parts.length > 0) {
        parent.children.splice(index, 1, ...parts);
        return index + parts.length;
      }
    });
  };
};
