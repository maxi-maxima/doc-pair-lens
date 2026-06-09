#!/usr/bin/env node
import { Command } from "commander";
import pc from "picocolors";
import { checkFiles, writeDemo } from "./runner.js";
import type { PairReport } from "./types.js";

const program = new Command();

program
  .name("doc-pair-lens")
  .description("Catch structure drift between paired bilingual Markdown docs.")
  .version("0.1.0");

program
  .command("check")
  .argument("<source>", "source Markdown file")
  .argument("<target>", "paired Markdown file")
  .option("--out <dir>", "output directory", "reports/doc-pair-lens")
  .action(async (source: string, target: string, options: { out: string }) => {
    const report = await checkFiles(source, target, options.out);
    printSummary(report);
    console.log(`Reports: ${options.out}`);
    process.exitCode = report.totals.errors > 0 ? 1 : 0;
  });

program.command("demo").option("--out <dir>", "output directory", "reports/demo").action(async (options: { out: string }) => {
  const report = await writeDemo(options.out);
  printSummary(report);
  console.log(`Reports: ${options.out}`);
});

program.parse();

function printSummary(report: PairReport): void {
  const status = report.totals.errors > 0 ? pc.red("FAIL") : report.totals.warnings > 0 ? pc.yellow("WARN") : pc.green("PASS");
  console.log(`Doc Pair Lens ${status}`);
  console.log(`Source: ${report.source.file}`);
  console.log(`Target: ${report.target.file}`);
  console.log(`Errors: ${report.totals.errors}`);
  console.log(`Warnings: ${report.totals.warnings}`);
}
