import type * as Hast from 'hast'
import type * as Mdast from 'mdast'

export interface Visitor<T extends object, U extends T = T> {
  test?: (node: T) => node is U,
  visit: (node: U) => void,
}

export async function visit<T extends object, U extends T = T>(
  node: T,
  singleOrMultiple: Visitor<T, U> | Visitor<T, U>[],
) {
  const visitors = Array.isArray(singleOrMultiple) ? singleOrMultiple : [singleOrMultiple]
  for (const visitor of visitors) {
    const isMatch = typeof visitor.test === 'function' ? visitor.test(node) : true
    if (isMatch) {
      visitor.visit(node as U)
    }
    if ('children' in node && Array.isArray(node.children)) {
      for (const child of node.children) {
        visit(child, visitors)
      }
    }
  }
  return node
}

export function defineVisitor<T extends object, U extends T = T>(visitor: Visitor<T, U>) {
  return visitor
}

export interface AsyncVisitor<T extends object, U extends T = T> {
  test?: (node: T) => node is U,
  visit: (node: U) => Promise<void>,
}

export async function visitAsync<T extends object, U extends T = T>(
  node: T,
  singleOrMultiple: AsyncVisitor<T, U> | AsyncVisitor<T, U>[],
) {
  const visitors = Array.isArray(singleOrMultiple) ? singleOrMultiple : [singleOrMultiple]
  for (const visitor of visitors) {
    const isMatch = typeof visitor.test === 'function' ? visitor.test(node) : true
    if (isMatch) {
      await visitor.visit(node as U)
    }
    if ('children' in node && Array.isArray(node.children)) {
      for (const child of node.children) {
        await visitAsync(child, visitors)
      }
    }
  }
  return node
}

export function defineAsyncVisitor<T extends object, U extends T = T>(visitor: AsyncVisitor<T, U>) {
  return visitor
}

export type MdastVisitor<T extends Mdast.Nodes = Mdast.Nodes> = Visitor<Mdast.Nodes, T>
export type AsyncMdastVisitor<T extends Mdast.Nodes = Mdast.Nodes> = AsyncVisitor<Mdast.Nodes, T>

export function defineMdastVisitor<T extends Mdast.Nodes = Mdast.Nodes>(visitor: MdastVisitor<T>) {
  return visitor
}

export function defineAsyncMdastVisitor<T extends Mdast.Nodes = Mdast.Nodes>(visitor: AsyncMdastVisitor<T>) {
  return visitor
}

export function visitMdast<T extends Mdast.Nodes = Mdast.Nodes>(
  node: Mdast.Nodes,
  singleOrMultiple: MdastVisitor<T> | MdastVisitor<T>[],
) {
  return visit(node, singleOrMultiple)
}

export function visitMdastAsync<T extends Mdast.Nodes = Mdast.Nodes>(
  node: Mdast.Nodes,
  singleOrMultiple: AsyncMdastVisitor<T> | AsyncMdastVisitor<T>[],
) {
  return visitAsync(node, singleOrMultiple)
}

export type HastVisitor<T extends Hast.Nodes = Hast.Nodes> = Visitor<Hast.Nodes, T>
export type AsyncHastVisitor<T extends Hast.Nodes = Hast.Nodes> = AsyncVisitor<Hast.Nodes, T>

export function defineHastVisitor<T extends Hast.Nodes = Hast.Nodes>(visitor: HastVisitor<T>) {
  return visitor
}

export function defineAsyncHastVisitor<T extends Hast.Nodes = Hast.Nodes>(visitor: AsyncHastVisitor<T>) {
  return visitor
}

export function visitHast<T extends Hast.Nodes = Hast.Nodes>(
  node: Hast.Nodes,
  singleOrMultiple: HastVisitor<T> | HastVisitor<T>[],
) {
  return visit(node, singleOrMultiple)
}

export function visitHastAsync<T extends Hast.Nodes = Hast.Nodes>(
  node: Hast.Nodes,
  singleOrMultiple: AsyncHastVisitor<T> | AsyncHastVisitor<T>[],
) {
  return visitAsync(node, singleOrMultiple)
}
