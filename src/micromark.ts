import { defList, defListHtml } from 'micromark-extension-definition-list'
import type { HtmlOptions as GfmHtmlOptions, Options as GfmOptions } from 'micromark-extension-gfm'
import { gfm, gfmHtml } from 'micromark-extension-gfm'
import type { HtmlOptions as MathHtmlOptions, Options as MathOptions } from 'micromark-extension-math'
import { math, mathHtml } from 'micromark-extension-math'
import { combineExtensions, combineHtmlExtensions } from 'micromark-util-combine-extensions'
import type { Extension, HtmlExtension } from 'micromark-util-types'

export interface MarkdowntownSyntaxOptions {
  gfm?: GfmOptions,
  math?: MathOptions,
}

export function markdowntownSyntax(options?: MarkdowntownSyntaxOptions): Extension {
  return combineExtensions([
    gfm(options?.gfm),
    math(options?.math),
    defList,
  ])
}

export interface MarkdowntownHtmlOptions {
  gfm?: GfmHtmlOptions,
  math?: MathHtmlOptions,
}

export function markdowntownHtml(options?: MarkdowntownHtmlOptions): HtmlExtension {
  return combineHtmlExtensions([
    gfmHtml(options?.gfm),
    mathHtml(options?.math),
    defListHtml,
  ])
}
