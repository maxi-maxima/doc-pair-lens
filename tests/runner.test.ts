import { mkdtemp, readFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { writeDemo } from "../src/runner.js";

describe("writeDemo", () => {
  it("writes JSON and Markdown pair reports", async () => {
    const out = await mkdtemp(path.join(os.tmpdir(), "doc-pair-lens-"));

    const report = await writeDemo(out);

    expect(report.totals.errors).toBeGreaterThan(0);
    await expect(readFile(path.join(out, "doc-pair-lens.json"), "utf8")).resolves.toContain("heading-count-mismatch");
    await expect(readFile(path.join(out, "doc-pair-lens.md"), "utf8")).resolves.toContain("Doc Pair Lens Report");
  });
});
