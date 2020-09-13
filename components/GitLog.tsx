import React, { memo, useContext, useEffect, useState } from "react"
import { RefFragment } from "~/types/RefFragment"
import { QueryRepository } from "~/types/QueryRepository"
import Axios from "axios"
import { BozzContext } from "./App"

export const GitLog: React.FC<{
  repo: QueryRepository["repository"]
  branch?: RefFragment
}> = memo(({ repo, branch }) => {
  const { repos } = useContext(BozzContext)
  const path = repos?.find(e => e.remotes?.origin?.url === repo?.sshUrl)?.path
  const [commits, setCommits] = useState<GitCommit[]>([])
  const ref = [
    branch?.associatedPullRequests?.nodes?.[0]?.baseRef?.target?.oid,
    branch?.target?.oid,
  ].join("..")
  useEffect(() => {
    Axios.post("/.bozz/commits", { path, ref }).then(({ data }) =>
      setCommits(data)
    )
    Axios.post("/.bozz/diffs", { path, ref }).then(({ data }) =>
      console.log(data)
    )
  }, [path, ref])
  return (
    <section>
      {commits.map(e => (
        <div key={e.hash}>
          {e.subject}
          <details>
            <pre>{JSON.stringify(e, null, 2)}</pre>
          </details>
        </div>
      ))}
    </section>
  )
})
