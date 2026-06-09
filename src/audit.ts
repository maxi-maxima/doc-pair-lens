import type { PairReport } from "./types.js";
import { extractShape } from "./shape.js";

export function auditPair(sourceFile: string, source: string, targetFile: string, target: string): PairReport {
  const sourceShape = extractShape(sourceFile, source);
  const targetShape = extractShape(targetFile, target);
  const findings = [];

  if (sourceShape.headings.length !== targetShape.headings.length) {
    findings.push({
      severity: "error" as const,
      code: "heading-count-mismatch",
      message: `Heading counts differ: ${sourceShape.headings.length} in ${sourceFile}, ${targetShape.headings.length} in ${targetFile}.`
    });
  }

  const sourceLevels = sourceShape.headings.map((heading) => heading.level).join(",");
  const targetLevels = targetShape.headings.map((heading) => heading.level).join(",");
  if (sourceLevels !== targetLevels) {
    findings.push({
      severity: "error" as const,
      code: "heading-level-sequence-mismatch",
      message: "Heading level sequences differ between paired docs."
    });
  }

  const sourceCodeLangs = sourceShape.codeBlocks.map((block) => block.lang).join(",");
  const targetCodeLangs = targetShape.codeBlocks.map((block) => block.lang).join(",");
  if (sourceShape.codeBlocks.length !== targetShape.codeBlocks.length) {
    findings.push({
      severity: "warning" as const,
      code: "code-block-count-mismatch",
      message: "Code block counts differ between paired docs."
    });
  } else if (sourceCodeLangs !== targetCodeLangs) {
    findings.push({
      severity: "warning" as const,
      code: "code-language-mismatch",
      message: "Code block language sequences differ between paired docs."
    });
  }

  if (sourceShape.tables !== targetShape.tables) {
    findings.push({
      severity: "warning" as const,
      code: "table-count-mismatch",
      message: `Table counts differ: ${sourceShape.tables} in ${sourceFile}, ${targetShape.tables} in ${targetFile}.`
    });
  }

  const sourceExternalLinks = sourceShape.links.filter((link) => !isPairLink(link, targetFile));
  const targetExternalLinks = targetShape.links.filter((link) => !isPairLink(link, sourceFile));
  if (sourceExternalLinks.length !== targetExternalLinks.length) {
    findings.push({
      severity: "warning" as const,
      code: "link-count-mismatch",
      message: "Non-pair link counts differ between paired docs."
    });
  }

  return {
    source: sourceShape,
    target: targetShape,
    findings,
    totals: {
      errors: findings.filter((finding) => finding.severity === "error").length,
      warnings: findings.filter((finding) => finding.severity === "warning").length,
      sourceHeadings: sourceShape.headings.length,
      targetHeadings: targetShape.headings.length,
      sourceCodeBlocks: sourceShape.codeBlocks.length,
      targetCodeBlocks: targetShape.codeBlocks.length
    }
  };
}

function isPairLink(link: string, pairFile: string): boolean {
  return link.replaceAll("\\", "/").endsWith(pairFile.replaceAll("\\", "/"));
}
