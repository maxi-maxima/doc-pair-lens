# Doc Pair Lens Design

## Problem

Bilingual README pairs drift. The translated file may miss sections, examples, links, or tables after the primary README changes.

## Scope

`doc-pair-lens` compares Markdown structure, not translation quality. It checks heading levels, code-block languages, table counts, and links.

## Commands

- `check <source> <target>`: compare a Markdown pair.
- `demo`: generate a sample drift report.

## Verification

The release gate is `npm run check`, demo generation, and `npm pack --dry-run --ignore-scripts`.
