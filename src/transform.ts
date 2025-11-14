import type * as Hast from 'hast'
import type { Options as ToHtmlOptions } from 'hast-util-to-html'
import { toHtml } from 'hast-util-to-html'
import type * as Mdast from 'mdast'
import type { Options as FromMarkdownOptions } from 'mdast-util-from-markdown'
import { fromMarkdown } from 'mdast-util-from-markdown'
import type { Options as ToHastOptions } from 'mdast-util-to-hast'
import { toHast } from 'mdast-util-to-hast'
import type { Options as ToMarkdownOptions } from 'mdast-util-to-markdown'
import { toMarkdown } from 'mdast-util-to-markdown'
import { toString } from 'mdast-util-to-string'
import { combineHastOptions, markdowntownToHast } from './hast'
import type { MarkdowntownToMarkdownOptions } from './mdast'
import { markdowntownFromMarkdown, markdowntownToMarkdown } from './mdast'
import type { MarkdowntownSyntaxOptions } from './micromark'
import { markdowntownSyntax } from './micromark'

export function mdastToString(mdast: Mdast.Nodes) {
  return toString(mdast)
}

export interface MarkdownToMdastOptions {
  mdast?: FromMarkdownOptions,
  markdowntownSyntax?: MarkdowntownSyntaxOptions,
}

export function markdownToMdast(text: string, options?: MarkdownToMdastOptions): Mdast.Root {
  const mdast = fromMarkdown(text, {
    extensions: [
      markdowntownSyntax(options?.markdowntownSyntax),
      ...(options?.mdast?.extensions ?? []),
    ],
    mdastExtensions: [
      markdowntownFromMarkdown(),
      ...(options?.mdast?.mdastExtensions ?? []),
    ],
  })
  return mdast
}

export interface MdastToMarkdownOptions {
  markdown?: ToMarkdownOptions,
  markdowntownToMarkdown?: MarkdowntownToMarkdownOptions,
}

export function mdastToMarkdown(mdast: Mdast.Nodes, options?: MdastToMarkdownOptions): string {
  return toMarkdown(mdast, {
    extensions: [
      markdowntownToMarkdown(options?.markdowntownToMarkdown),
      ...(options?.markdown ? [options.markdown] : []),
    ],
  })
}

export interface MdastToHastOptions {
  hast?: ToHastOptions,
}

export function mdastToHast(mdast: Mdast.Nodes, options?: MdastToHastOptions): Hast.Nodes {
  return toHast(mdast, combineHastOptions([
    markdowntownToHast(),
    ...(options?.hast ? [options.hast] : []),
  ]))
}

export interface MarkdownToHastOptions extends MarkdownToMdastOptions, MdastToHastOptions {
}

export function markdownToHast(text: string, options?: MarkdownToHastOptions): Hast.Nodes {
  return mdastToHast(
    markdownToMdast(text, options),
    options,
  )
}

export interface HastToHtmlOptions {
  html?: ToHtmlOptions,
}

export function hastToHtml(hast: Hast.Nodes, options?: HastToHtmlOptions): string {
  return toHtml(hast, options?.html)
}

export interface MdastToHtmlOptions extends MdastToHastOptions, HastToHtmlOptions {
}

export function mdastToHtml(mdast: Mdast.Nodes, options?: MdastToHtmlOptions): string {
  return hastToHtml(
    mdastToHast(mdast, options),
    options,
  )
}

export interface MarkdownToHtmlOptions extends MarkdownToMdastOptions, MdastToHtmlOptions {
}

export function markdownToHtml(text: string, options?: MarkdownToHtmlOptions): string {
  return mdastToHtml(
    markdownToMdast(text, options),
    options,
  )
}
