import { defListFromMarkdown, defListToMarkdown } from 'mdast-util-definition-list'
import type { Extension } from 'mdast-util-from-markdown'
import type { Options as GfmOptions } from 'mdast-util-gfm'
import { gfmFromMarkdown, gfmToMarkdown } from 'mdast-util-gfm'
import type { ToOptions as MathOptions } from 'mdast-util-math'
import { mathFromMarkdown, mathToMarkdown } from 'mdast-util-math'
import type { Options as ToOptions } from 'mdast-util-to-markdown'

export function markdowntownFromMarkdown(): Extension[] {
  return [
    ...gfmFromMarkdown(),
    mathFromMarkdown(),
    defListFromMarkdown,
  ]
}

export interface MarkdowntownToMarkdownOptions {
  gfm?: GfmOptions,
  math?: MathOptions,
}

export function markdowntownToMarkdown(options?: MarkdowntownToMarkdownOptions): ToOptions {
  return {
    extensions: [
      gfmToMarkdown(options?.gfm),
      mathToMarkdown(options?.math),
      defListToMarkdown,
    ],
  }
}
