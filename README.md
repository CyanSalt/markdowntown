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
  markdownToHtml,
} from 'markdowntown'

markdownToHtml('## Hello, *world*!') // "<h2>Hello, <em>world</em>!</h2>"
```

You can also use any intermediate method to process markdown strings, mdast, or hast.

```ts
import {
  markdownToMdast,
  mdastToMarkdown,
  mdastToHast,
  markdownToHast,
  hastToHtml,
  mdastToHtml,
} from 'markdowntown'
```

### Options

You can pass an object parameter as an option in the second argument of each transform function in a similar format:

```ts
markdownToHtml('## Hello, *world*!', {
  markdowntownSyntax: { /* ... */ },
  markdowntownToMarkdown: { /* ... */ },
  markdowntownRaw: false,
  mdast: { /* ... */ },
  mdastTransform: [ /* ... */ ],
  hast: { /* ... */ },
  html: { /* ... */ },
  hastRaw: { /* ... */ },
  // markdown: { /* ... */ },
  // string: { /* ... */ },
})
```

Different methods have different available option fields, depending on where the transformation is located in the process.

### Import types and utilities

All types in the ecosystem can be imported through the corresponding namespaces.

```ts
import {
  Mdast, // alias to module 'mdast'
  Hast, // alias to module 'hast'
  Micromark, // alias to module 'micromark-util-types'
  MdastDefList, // alias to module 'mdast-util-definition-list'
  MdastMath, // alias to module 'mdast-util-math'
  MicromarkGfm, // alias to module 'micromark-extension-gfm'
  MicromarkMath, // alias to module 'micromark-extension-math'
  ToString, // alias to module 'mdast-util-to-string'
  FromMarkdown, // alias to module 'mdast-util-from-markdown'
  ToMarkdown, // alias to module 'mdast-util-to-markdown'
  ToHast, // alias to module 'mdast-util-to-hast'
  ToHtml, // alias to module 'hast-util-to-html'
  HastRaw, // alias to module 'hast-util-raw'
} from 'markdowntown'
```

And some useful variables:

```ts
import {
  defaultHastHandlers, // from module 'mdast-util-to-hast'
  defaultMarkdownHandlers, // from module 'mdast-util-to-markdown'
} from 'markdowntown'
```

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
import { defineMdastVisitor, visitMdast } from 'markdowntown'

const visitor = defineMdastVisitor({
  test: node => node.type === 'text',
  visit: node => {
    node.data ??= {}
    node.data.myFlag = 1
  }
})

visitMdast(ast, visitor)
```

```ts
import { defineAsyncMdastVisitor, visitMdastAsync } from 'markdowntown'

const visitor = defineAsyncMdastVisitor({
  test: node => node.type === 'text',
  visit: async node => {
    node.value = await sanitize(node.value)
  }
})

await visitMdastAsync(ast, visitor)
```

## Motivation

[`micromark`](https://github.com/micromark/micromark) only exposes the transformation between Markdown and HTML strings, which is not friendly to front-end frameworks. However, using `mdast-util-*` in combination is too complicated. Therefore, `markdowntown` was created.
