import { defList, defListHtml } from 'micromark-extension-definition-list'
import type * as MicromarkGfm from 'micromark-extension-gfm'
import { gfm, gfmHtml } from 'micromark-extension-gfm'
import type * as MicromarkMath from 'micromark-extension-math'
import { math, mathHtml } from 'micromark-extension-math'
import { combineExtensions, combineHtmlExtensions } from 'micromark-util-combine-extensions'
import type * as Micromark from 'micromark-util-types'

export interface MarkdowntownSyntaxOptions {
  gfm?: MicromarkGfm.Options,
  math?: MicromarkMath.Options,
}

export function markdowntownSyntax(options?: MarkdowntownSyntaxOptions): Micromark.Extension {
  return combineExtensions([
    gfm(options?.gfm),
    math(options?.math),
    defList,
  ])
}

export interface MarkdowntownHtmlOptions {
  gfm?: MicromarkGfm.HtmlOptions,
  math?: MicromarkMath.HtmlOptions,
}

export function markdowntownHtml(options?: MarkdowntownHtmlOptions): Micromark.HtmlExtension {
  return combineHtmlExtensions([
    gfmHtml(options?.gfm),
    mathHtml(options?.math),
    defListHtml,
  ])
}
