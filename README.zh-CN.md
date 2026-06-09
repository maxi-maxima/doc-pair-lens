<div align="center">

# Doc Pair Lens

**检查成对双语 Markdown 文档的结构漂移。**

[English](README.md)

</div>

双语文档会悄悄漂移。`README.md` 新增了章节、表格、示例或链接。`README.zh-CN.md` 看起来仍然正常，但其实已经落后。

`doc-pair-lens` 比较的是 Markdown 结构，而不是翻译质量：

- 标题数量和标题层级序列
- 代码块数量和语言序列
- 表格数量
- 非互指链接数量

不调用模型。不做翻译。不联网。

## 30 秒演示

```bash
npx github:maxi-maxima/doc-pair-lens demo
```

## 检查一对文档

```bash
npx github:maxi-maxima/doc-pair-lens check README.md README.zh-CN.md --out reports/docs
```

报告会写到：

```text
reports/docs/doc-pair-lens.json
reports/docs/doc-pair-lens.md
```

## 能发现什么

| 检查项 | 级别 | 含义 |
| --- | --- | --- |
| `heading-count-mismatch` | error | 一个文件比另一个文件多章节。 |
| `heading-level-sequence-mismatch` | error | 章节嵌套不同。 |
| `code-block-count-mismatch` | warning | 示例数量不同。 |
| `code-language-mismatch` | warning | 示例语言序列不同。 |
| `table-count-mismatch` | warning | 表格数量不同。 |
| `link-count-mismatch` | warning | 非互指链接数量不同。 |

## 为什么检查结构，而不是文本？

翻译质量需要人或语言模型判断。结构漂移更简单，也常常更紧急：如果整段章节缺失，不管措辞如何，目标文档都已经过期。

## 开发

```bash
npm install
npm run check
node dist/cli.js demo --out reports/demo
npm pack --dry-run --ignore-scripts
```

## 许可证

MIT
