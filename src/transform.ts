import type { Nodes as HastNodes } from 'hast'
import { toHtml } from 'hast-util-to-html'
import type { Nodes, Root } from 'mdast'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { toHast } from 'mdast-util-to-hast'
import { toMarkdown } from 'mdast-util-to-markdown'
import { markdowntownToHast } from './hast'
import { markdowntownFromMarkdown, markdowntownToMarkdown } from './mdast'
import { markdowntownSyntax } from './micromark'

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
  return toMarkdown(mdast, markdowntownToMarkdown())
}

export function mdastToHast(mdast: Nodes) {
  return toHast(mdast, markdowntownToHast())
}

export function textToHast(text: string) {
  return mdastToHast(
    textToMdast(text),
  )
}

export function hastToHtml(hast: HastNodes) {
  return toHtml(hast)
}

export function mdastToHtml(mdast: Nodes) {
  return hastToHtml(
    mdastToHast(mdast),
  )
}

export function textToHtml(text: string) {
  return mdastToHtml(
    textToMdast(text),
  )
}
