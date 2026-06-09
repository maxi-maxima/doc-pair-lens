# Research Notes

This project was selected after avoiding overlap with the user's existing public-launch repos:

- `mcp-fire-drill`: MCP and agent security drills
- `context-cal`: agent context budget auditing
- `screenlint`: rendered UI checking
- `mcp-flightcheck`: MCP server contract checks
- `webmcp-formkit`: WebMCP form metadata migration
- `agent-pr-brief`: deterministic PR review brief generation
- `test-lane-finder`: verification lane planning
- `import-proof`: package API hallucination checks
- `cmd-receipt`: command execution receipts
- `help-contract`: CLI help contract auditing
- `script-doc-sync`: README/package script drift
- `packlist-lens`: npm packlist auditing

The opportunity is bilingual documentation maintenance. Open-source projects increasingly keep English and Chinese docs side by side, but translation files often lag behind source docs. Agents can generate translations, but someone still needs a cheap structural drift check.

`doc-pair-lens` deliberately avoids judging translation quality. It checks whether the paired docs have the same skeleton: headings, examples, tables, and links.

Useful current references:

- https://www.markdownguide.org/basic-syntax/
- https://github.com/sindresorhus/awesome/blob/main/readme.md
- https://github.com/readme/guides
