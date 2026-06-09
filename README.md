<div align="center">

# Doc Pair Lens

**Catch structure drift between paired bilingual Markdown docs.**

[简体中文](README.zh-CN.md)

</div>

Bilingual docs drift quietly. `README.md` gains a new section, table, example, or link. `README.zh-CN.md` still looks fine, but it is now behind.

`doc-pair-lens` compares Markdown structure, not translation quality:

- heading count and heading level sequence
- code block count and language sequence
- table count
- non-pair link count

No model call. No translation. No network.

## 30 Second Demo

```bash
npx github:maxi-maxima/doc-pair-lens demo
```

## Check A Pair

```bash
npx github:maxi-maxima/doc-pair-lens check README.md README.zh-CN.md --out reports/docs
```

The report is written to:

```text
reports/docs/doc-pair-lens.json
reports/docs/doc-pair-lens.md
```

## What It Catches

| Finding | Severity | Meaning |
| --- | --- | --- |
| `heading-count-mismatch` | error | One file has more sections than the other. |
| `heading-level-sequence-mismatch` | error | Section nesting differs. |
| `code-block-count-mismatch` | warning | Example count differs. |
| `code-language-mismatch` | warning | Example language sequence differs. |
| `table-count-mismatch` | warning | Table count differs. |
| `link-count-mismatch` | warning | Non-pair link count differs. |

## Why Structure, Not Text?

Translation quality needs a human or a language model. Structure drift is simpler and often more urgent: if a whole section is missing, the target doc is stale regardless of wording.

## Development

```bash
npm install
npm run check
node dist/cli.js demo --out reports/demo
npm pack --dry-run --ignore-scripts
```

## License

MIT
