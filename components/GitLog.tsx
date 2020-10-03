import Axios from "axios"
import parseDiff from "parse-diff"
import React, { useContext, useEffect, useState } from "react"
import { QueryRepository } from "~/types/QueryRepository"
import { RefFragment } from "~/types/RefFragment"
import { BozzContext } from "./App"

export const GitLog: React.FC<{
  repo: QueryRepository["repository"]
  branch?: RefFragment
}> = ({ repo, branch }) => {
  const { repos } = useContext(BozzContext)
  const path = repos?.find(e => e.origin?.url === repo?.sshUrl)?.path
  const [commits, setCommits] = useState<GitCommit[]>([])
  const [diffs, setDiffs] = useState<parseDiff.File[]>([])
  const ref = [
    branch?.associatedPullRequests?.nodes?.[0]?.baseRef?.target?.oid ||
      "origin/HEAD",
    branch?.target?.oid || "HEAD",
  ].join("..")
  useEffect(() => {
    if (!path) return
    Axios.post("/.bozz/commits", { path, ref }).then(({ data }) =>
      setCommits(data)
    )
    Axios.post("/.bozz/diffs", { path, ref }).then(({ data }) => setDiffs(data))
  }, [path, ref])
  return (
    <section>
      {commits.map(e => (
        <div key={e.hash}>
          <details>
            <summary>{e.subject}</summary>
            <pre>{JSON.stringify(e, null, 2)}</pre>
          </details>
        </div>
      ))}
      {diffs.map((file, i) => (
        <div key={i}>
          <details>
            <summary>
              {file.to} +{file.additions} -{file.deletions}
            </summary>
            {file.chunks.map((chunk, i) => (
              <div key={i}>
                <pre>{chunk.content}</pre>
                {chunk.changes.map((change, i) => (
                  <div key={i}>
                    <pre>{change.content}</pre>
                  </div>
                ))}
                {/* <pre>{JSON.stringify(chunk, null, 2)}</pre> */}
              </div>
            ))}
          </details>
        </div>
      ))}
    </section>
  )
}
