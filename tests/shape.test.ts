import { describe, expect, it } from "vitest";
import { extractShape } from "../src/shape.js";

describe("extractShape", () => {
  it("extracts heading levels, code block languages, tables, and links", () => {
    const shape = extractShape(
      "README.md",
      `# Title

## Install

\`\`\`bash
npm install
\`\`\`

| A | B |
| - | - |
| 1 | 2 |

[中文](README.zh-CN.md)
`
    );

    expect(shape.headings.map((heading) => heading.level)).toEqual([1, 2]);
    expect(shape.codeBlocks.map((block) => block.lang)).toEqual(["bash"]);
    expect(shape.tables).toBe(1);
    expect(shape.links).toContain("README.zh-CN.md");
  });
});
