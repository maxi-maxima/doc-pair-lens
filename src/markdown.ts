import type { PairReport } from "./types.js";

export function toMarkdown(report: PairReport): string {
  const lines = [
    "# Doc Pair Lens Report",
    "",
    `Source: \`${report.source.file}\``,
    "",
    `Target: \`${report.target.file}\``,
    "",
    "| Source headings | Target headings | Source code blocks | Target code blocks | Errors | Warnings |",
    "| ---: | ---: | ---: | ---: | ---: | ---: |",
    `| ${report.totals.sourceHeadings} | ${report.totals.targetHeadings} | ${report.totals.sourceCodeBlocks} | ${report.totals.targetCodeBlocks} | ${report.totals.errors} | ${report.totals.warnings} |`,
    "",
    "## Findings",
    ""
  ];

  if (report.findings.length === 0) {
    lines.push("No findings.");
  } else {
    lines.push("| Severity | Code | Message |");
    lines.push("| --- | --- | --- |");
    for (const finding of report.findings) {
      lines.push(`| ${finding.severity} | \`${finding.code}\` | ${finding.message} |`);
    }
  }

  lines.push("");
  lines.push("## Heading Levels");
  lines.push("");
  lines.push(`- Source: ${report.source.headings.map((heading) => heading.level).join(", ") || "none"}`);
  lines.push(`- Target: ${report.target.headings.map((heading) => heading.level).join(", ") || "none"}`);
  lines.push("");
  return lines.join("\n");
}
