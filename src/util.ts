import { useState, useCallback } from "react"

export function nonNull<T>(value: T | null): value is T {
  return value !== null
}

export function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined
}

export function parse<A>(json: string): A | null {
  try {
    return JSON.parse(json)
  } catch (error) {
    console.warn(error)
  }
  return null
}

export function nodes<T extends Object>(
  frag: { nodes: ReadonlyArray<T | null> | null } | null | undefined
): T[] {
  return frag?.nodes?.filter(nonNull) || []
}

export function useStorage(name: string, storage?: Storage) {
  const [state, setState] = useState(storage?.getItem(name) || "")
  return [
    state,
    useCallback(
      function persistState(value: string) {
        storage?.setItem(name, value)
        setState(value)
      },
      [name, storage]
    ),
  ]
}

export class Params {
  static string(value: string | string[] | undefined): string {
    if (Array.isArray(value)) return value[0]
    if (typeof value === "string") return value
    return ""
  }
  static number(value: string | string[] | undefined): number | undefined {
    return Number(Params.string(value)) || undefined
  }
  static flatten<T>(query: Record<string, string | string[] | undefined>) {
    return Object.entries(query).reduce(
      (acc, [k, v]) => ({ ...acc, [k]: Params.string(v) }),
      {}
    )
  }
}
