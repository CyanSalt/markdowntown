# markdowntown

[![npm](https://img.shields.io/npm/v/markdowntown.svg)](https://www.npmjs.com/package/markdowntown)

Recognized markdown syntax tool.

## Installation

```shell
pnpm add markdowntown
```

## Usage

```ts
import {
  textToMdast,
  mdastToText,
  mdastToHast,
  textToHast,
  hastToHtml,
  mdastToHtml,
  textToHtml,
} from 'markdowntown'

const mdast = mdastToText('# Hi\n\nHello, world!\n') // { type: "root", "children": [...] }
textToMdast(mdast) // "# Hi\n\nHello, world!\n"
```

None of these functions support passing option parameters. Refer to the following parts for customization.

### Used as plugins

```ts
import { fromMarkdown } from 'mdast-util-from-markdown'
import { markdowntownFromMarkdown, markdowntownSyntax } from 'markdowntown'

fromMarkdown(text, {
  extensions: [
    markdowntownSyntax({
      gfm: { /* ... */ },
      math: { /* ... */ },
    }),
  ],
  mdastExtensions: [
    markdowntownFromMarkdown(),
  ],
})
```

```ts
import { toMarkdown } from 'mdast-util-to-markdown'
import { markdowntownToMarkdown } from 'markdowntown'

toMarkdown(mdast, {
  extensions: [
    markdowntownToMarkdown({
      gfm: { /* ... */ },
      math: { /* ... */ },
    }),
  ],
})
```

```ts
import { toHast } from 'mdast-util-to-hast'
import { markdowntownToHast, combineHastOptions } from 'markdowntown'

toHast(mdast, combineHastOptions([
  markdowntownToHast(),
  { /* ... */ },
]))
```

For plugin options, please refer to:

- `markdowntownSyntax`
  - [`gfm`](https://github.com/micromark/micromark-extension-gfm?tab=readme-ov-file#options)
  - [`math`](https://github.com/micromark/micromark-extension-math?tab=readme-ov-file#options)
- `markdowntownToMarkdown`
  - [`gfm`](https://github.com/syntax-tree/mdast-util-gfm?tab=readme-ov-file#options)
  - [`math`](https://github.com/syntax-tree/mdast-util-math?tab=readme-ov-file#tooptions)

### Traversing the AST

```ts
import { defineVisitor, visit } from 'markdowntown'

const visitor = defineVisitor({
  test: node => node.type === 'text',
  visit: node => {
    node.data ??= {}
    node.data.myFlag = 1
  }
})

visit(ast, visitor)
```

```ts
import { defineAsyncVisitor, visitAsync } from 'markdowntown'

const visitor = defineAsyncVisitor({
  test: node => node.type === 'text',
  visit: async node => {
    node.value = await sanitize(node.value)
  }
})

await visitAsync(ast, visitor)
```
