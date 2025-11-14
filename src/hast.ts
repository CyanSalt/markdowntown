import { defListHastHandlers } from 'mdast-util-definition-list'
import type * as ToHast from 'mdast-util-to-hast'

function mergeObject<T extends object>(a: T | null | undefined, b: T | null | undefined) {
  return b === null || b === undefined ? a : (
    a === null || a === undefined ? b : { ...a, ...b }
  )
}

function mergeArray<T>(a: T[] | null | undefined, b: T[] | null | undefined) {
  return b === null || b === undefined ? a : (
    a === null || a === undefined ? b : [...a, ...b]
  )
}

export function combineHastOptions(list: ToHast.Options[]): ToHast.Options {
  let options: ToHast.Options = {}
  for (const item of list) {
    options = {
      ...options,
      ...item,
      footnoteLabelProperties: mergeObject(options.footnoteLabelProperties, item.footnoteLabelProperties),
      handlers: mergeObject(options.handlers, item.handlers),
      passThrough: mergeArray(options.passThrough, item.passThrough),
    }
  }
  return options
}

export function markdowntownToHast(): ToHast.Options {
  // return combineHastOptions([
  //   { handlers: defListHastHandlers },
  // ])
  return { handlers: defListHastHandlers }
}
