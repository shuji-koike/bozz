import React, { useContext } from "react"
import { BozzContext } from "./App"

export const GitLog: React.FC<{
  sshUrl: string
}> = ({ sshUrl }) => {
  const { repos } = useContext(BozzContext)
  const repo = repos?.find(e => e.remotes?.origin?.url === sshUrl)
  return (
    <section>
      {repo?.commits?.map(e => (
        <div key={e.hash}>
          {e.subject}
          <details>
            <pre>{JSON.stringify(e, null, 2)}</pre>
          </details>
        </div>
      ))}
    </section>
  )
}
