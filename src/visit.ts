import type * as Mdast from 'mdast'

export interface Visitor<T extends Mdast.Nodes = Mdast.Nodes> {
  test?: (node: Mdast.Nodes) => node is T,
  visit: (node: T) => void,
}

export async function visit(node: Mdast.Nodes, singleOrMultiple: Visitor | Visitor[]) {
  const visitors = Array.isArray(singleOrMultiple) ? singleOrMultiple : [singleOrMultiple]
  for (const visitor of visitors) {
    const isMatch = typeof visitor.test === 'function' ? visitor.test(node) : true
    if (isMatch) {
      visitor.visit(node)
    }
    if ('children' in node && Array.isArray(node.children)) {
      for (const child of node.children) {
        visit(child, visitors)
      }
    }
  }
  return node
}

export function defineVisitor<T extends Mdast.Nodes>(visitor: Visitor<T>) {
  return visitor
}

export interface AsyncVisitor<T extends Mdast.Nodes = Mdast.Nodes> {
  test?: (node: Mdast.Nodes) => node is T,
  visit: (node: T) => Promise<void>,
}

export async function visitAsync(node: Mdast.Nodes, singleOrMultiple: AsyncVisitor | AsyncVisitor[]) {
  const visitors = Array.isArray(singleOrMultiple) ? singleOrMultiple : [singleOrMultiple]
  for (const visitor of visitors) {
    const isMatch = typeof visitor.test === 'function' ? visitor.test(node) : true
    if (isMatch) {
      await visitor.visit(node)
    }
    if ('children' in node && Array.isArray(node.children)) {
      for (const child of node.children) {
        await visitAsync(child, visitors)
      }
    }
  }
  return node
}

export function defineAsyncVisitor<T extends Mdast.Nodes>(visitor: AsyncVisitor<T>) {
  return visitor
}
