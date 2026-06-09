import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { auditPair } from "./audit.js";
import { toMarkdown } from "./markdown.js";
import type { PairReport } from "./types.js";

export async function checkFiles(sourceFile: string, targetFile: string, outDir: string): Promise<PairReport> {
  const [source, target] = await Promise.all([readFile(sourceFile, "utf8"), readFile(targetFile, "utf8")]);
  const report = auditPair(sourceFile, source, targetFile, target);
  await writeReport(report, outDir);
  return report;
}

export async function writeDemo(outDir: string): Promise<PairReport> {
  const source = `# Project

## Install

\`\`\`bash
npm install
\`\`\`

## Usage

| Command | Meaning |
| --- | --- |
| test | Run tests |
`;
  const target = `# 项目

## 安装

\`\`\`powershell
npm install
\`\`\`
`;
  const report = auditPair("README.md", source, "README.zh-CN.md", target);
  await writeReport(report, outDir);
  return report;
}

export async function writeReport(report: PairReport, outDir: string): Promise<void> {
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, "doc-pair-lens.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
  await writeFile(path.join(outDir, "doc-pair-lens.md"), toMarkdown(report), "utf8");
}
