import { describe, expect, it } from "vitest";
import { auditPair } from "../src/audit.js";

describe("auditPair", () => {
  it("reports heading and code-block structure drift", () => {
    const report = auditPair(
      "README.md",
      `# A
## Install
\`\`\`bash
npm test
\`\`\`
`,
      "README.zh-CN.md",
      `# A
## 安装
## 用法
\`\`\`powershell
npm test
\`\`\`
`
    );

    expect(report.findings).toContainEqual(
      expect.objectContaining({
        severity: "error",
        code: "heading-count-mismatch"
      })
    );
    expect(report.findings).toContainEqual(
      expect.objectContaining({
        severity: "warning",
        code: "code-language-mismatch"
      })
    );
  });
});
