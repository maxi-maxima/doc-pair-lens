export interface MarkdownShape {
  file: string;
  headings: Array<{ level: number; text: string; line: number }>;
  codeBlocks: Array<{ lang: string; line: number }>;
  tables: number;
  links: string[];
}

export interface Finding {
  severity: "error" | "warning";
  code: string;
  message: string;
}

export interface PairReport {
  source: MarkdownShape;
  target: MarkdownShape;
  findings: Finding[];
  totals: {
    errors: number;
    warnings: number;
    sourceHeadings: number;
    targetHeadings: number;
    sourceCodeBlocks: number;
    targetCodeBlocks: number;
  };
}
