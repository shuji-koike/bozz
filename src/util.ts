export function nonNull<T>(value: T | null): value is T {
  return value !== null
}

export function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined
}

export function tryParse<A>(json: string): A | null {
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
