import { defList } from 'micromark-extension-definition-list'
import type { Options as GfmOptions } from 'micromark-extension-gfm'
import { gfm } from 'micromark-extension-gfm'
import type { Options as MathOptions } from 'micromark-extension-math'
import { math } from 'micromark-extension-math'
import { combineExtensions } from 'micromark-util-combine-extensions'
import type { Extension } from 'micromark-util-types'

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
