import type { MarkdownShape } from "./types.js";

export function extractShape(file: string, markdown: string): MarkdownShape {
  const headings: MarkdownShape["headings"] = [];
  const codeBlocks: MarkdownShape["codeBlocks"] = [];
  const links = new Set<string>();
  let tables = 0;
  let inFence = false;
  let tableOpen = false;

  const lines = markdown.split(/\r?\n/);
  lines.forEach((line, index) => {
    const fenceMatch = /^```([A-Za-z0-9_-]*)/.exec(line.trim());
    if (fenceMatch) {
      if (!inFence) {
        codeBlocks.push({ lang: fenceMatch[1] || "", line: index + 1 });
      }
      inFence = !inFence;
      return;
    }

    if (inFence) {
      return;
    }

    const headingMatch = /^(#{1,6})\s+(.+)$/.exec(line);
    if (headingMatch) {
      headings.push({
        level: headingMatch[1].length,
        text: headingMatch[2].trim(),
        line: index + 1
      });
    }

    if (line.includes("|") && /^\s*\|?.+\|.+\|?\s*$/.test(line)) {
      if (!tableOpen) {
        tables += 1;
        tableOpen = true;
      }
    } else if (line.trim() === "") {
      tableOpen = false;
    }

    for (const linkMatch of line.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
      links.add(linkMatch[1]);
    }
  });

  return {
    file,
    headings,
    codeBlocks,
    tables,
    links: [...links].sort((a, b) => a.localeCompare(b))
  };
}
