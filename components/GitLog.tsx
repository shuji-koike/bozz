import React, { useContext } from "react"
import { BozzContext } from "./App"

export const GitLog: React.FC<{
  sshUrl: string
}> = ({ sshUrl }) => {
  const bozz = useContext(BozzContext)
  const repo = bozz.repos?.find(e => e.remotes?.origin?.url === sshUrl)
  return (
    <section>
      {repo?.commits?.map(e => (
        <div key={e.hash}>
          {e.subject}
            <pre>{JSON.stringify(e, null, 2)}</pre>
        </div>
      ))}
    </section>
  )
}
