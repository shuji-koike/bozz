import React, { useContext } from "react"
import { BozzContext } from "./App"

export const GitLog: React.FC<{
  sshUrl: string
}> = ({ sshUrl }) => {
  const bozz = useContext(BozzContext)
  const repo = bozz.repos?.find(e => e.remotes.origin?.url === sshUrl)
  console.log(
    bozz,
    repo,
    sshUrl,
    bozz.repos?.map(e => e.remotes.origin?.url)
  )
  return <section></section>
}
