import { describe, expect, it } from "vitest";
import { toMarkdown } from "../src/markdown.js";
import type { PairReport } from "../src/types.js";

describe("toMarkdown", () => {
  it("renders totals and findings", () => {
    const markdown = toMarkdown({
      source: {
        file: "README.md",
        headings: [{ level: 1, text: "Title", line: 1 }],
        codeBlocks: [],
        tables: 0,
        links: []
      },
      target: {
        file: "README.zh-CN.md",
        headings: [],
        codeBlocks: [],
        tables: 0,
        links: []
      },
      findings: [{ severity: "error", code: "heading-count-mismatch", message: "Heading counts differ." }],
      totals: {
        errors: 1,
        warnings: 0,
        sourceHeadings: 1,
        targetHeadings: 0,
        sourceCodeBlocks: 0,
        targetCodeBlocks: 0
      }
    } satisfies PairReport);

    expect(markdown).toContain("# Doc Pair Lens Report");
    expect(markdown).toContain("heading-count-mismatch");
    expect(markdown).toContain("README.zh-CN.md");
  });
});
