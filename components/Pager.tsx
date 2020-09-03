import React from "react"

type ConnectionFragment<T = any> = {
  totalCount: number
  pageInfo: {
    hasNextPage: boolean
  }
  nodes: ReadonlyArray<T | null> | null
}

export const PagerMore: React.FC<{
  frag: ConnectionFragment | null | undefined
}> = ({ frag }) =>
  frag && PagerUtil.more(frag) ? (
    <span>...{PagerUtil.count(frag)} more!</span>
  ) : (
    <></>
  )

export const PagerUtil = {
  more(e: ConnectionFragment) {
    return e.pageInfo.hasNextPage
  },
  count(e: ConnectionFragment) {
    return e.totalCount - e.nodes?.length!
  },
  reduce<
    T extends { __typename: string },
    A extends ConnectionFragment<T>[] = ConnectionFragment<T>[]
  >(...arr: A): ConnectionFragment<T> {
    return {
      totalCount: arr.reduce((acc, e) => acc + e.totalCount, 0),
      pageInfo: {
        hasNextPage: arr.reduce<boolean>(
          (acc, e) => acc || e.pageInfo.hasNextPage,
          false
        ),
      },
      nodes: arr.reduce<(T | null)[]>(
        (acc, e) => acc.concat(...(e.nodes || [])),
        []
      ),
    }
  },
}
