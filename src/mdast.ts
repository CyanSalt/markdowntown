import { defListFromMarkdown, defListToMarkdown } from 'mdast-util-definition-list'
import type * as FromMarkdown from 'mdast-util-from-markdown'
import type * as MdastGfm from 'mdast-util-gfm'
import { gfmFromMarkdown, gfmToMarkdown } from 'mdast-util-gfm'
import type * as MdastMath from 'mdast-util-math'
import { mathFromMarkdown, mathToMarkdown } from 'mdast-util-math'
import type * as ToMarkdown from 'mdast-util-to-markdown'

export function markdowntownFromMarkdown(): FromMarkdown.Extension[] {
  return [
    ...gfmFromMarkdown(),
    mathFromMarkdown(),
    defListFromMarkdown,
  ]
}

export interface MarkdowntownToMarkdownOptions {
  gfm?: MdastGfm.Options,
  math?: MdastMath.ToOptions,
}

export function markdowntownToMarkdown(options?: MarkdowntownToMarkdownOptions): ToMarkdown.Options {
  return {
    extensions: [
      gfmToMarkdown(options?.gfm),
      mathToMarkdown(options?.math),
      defListToMarkdown,
    ],
  }
}
