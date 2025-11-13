import type { Nodes, Root } from 'mdast'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { toMarkdown } from 'mdast-util-to-markdown'
import { markdowntownFromMarkdown, markdowntownToMarkdown } from './mdast'
import { markdowntownSyntax } from './syntax'

export function textToMdast(text: string): Root {
  const mdast = fromMarkdown(text, {
    extensions: [
      markdowntownSyntax(),
    ],
    mdastExtensions: [
      markdowntownFromMarkdown(),
    ],
  })
  return mdast
}

export function mdastToText(mdast: Nodes) {
  return toMarkdown(mdast, {
    extensions: [
      markdowntownToMarkdown(),
    ],
  })
}
