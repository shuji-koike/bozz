import { gql, useQuery } from "@apollo/client"
import { TabNav } from "@primer/components"
import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { nodes } from "../src/util"
import { QueryRepository } from "../types/QueryRepository"
import { GithubRef, GithubRefFragment } from "./GithubRef"
import { GitLog } from "./GitLog"
import { GithubLabel, GithubLabelFragment } from "./Labels"
import { HeaderSlot } from "./Layout"
import { QuerySuspense } from "./QuerySuspense"

export default function RepositoryPage() {
  const { owner, name } = useParams<{ owner: string; name: string }>()
  const { data, loading, error } = useQuery<QueryRepository>(query, {
    variables: { owner, name },
  })
  return (
    <QuerySuspense loading={loading} error={error}>
      <section>{data && <Repository frag={data.repository} />}</section>
    </QuerySuspense>
  )
}

const Repository: React.FC<{
  frag: QueryRepository["repository"] | null | undefined
}> = ({ frag }) => {
  const [tab, setTab] = useState(3)
  return (
    <>
      <HeaderSlot deps={[frag]}>
        {frag?.owner.login}/{frag?.name}
      </HeaderSlot>
      <TabNav aria-label="Main">
        {["Branches", "Issues", "Labels", "History"].map((e, i) => (
          <TabNav.Link key={i} selected={tab === i} onClick={() => setTab(i)}>
            {e}
          </TabNav.Link>
        ))}
      </TabNav>
      {
        [
          <BranchesTab frag={frag} />,
          <></>,
          <LabelsTab frag={frag} />,
          <GitLog sshUrl={frag?.sshUrl} />,
        ][tab]
      }
    </>
  )
}

const BranchesTab: React.FC<{
  frag: QueryRepository["repository"] | null | undefined
}> = ({ frag }) => {
  return (
    <section>
      {nodes(frag?.refs).map(e => (
        <p key={e.name}>
          <GithubRef key={e.name} frag={e}></GithubRef>
        </p>
      ))}
    </section>
  )
}

const LabelsTab: React.FC<{
  frag: QueryRepository["repository"] | null | undefined
}> = ({ frag }) => {
  return (
    <section>
      {nodes(frag?.labels).map(e => (
        <p key={e.name}>
          <GithubLabel key={e.name} frag={e}></GithubLabel>
        </p>
      ))}
    </section>
  )
}

const query = gql`
  query QueryRepository($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      name
      sshUrl
      owner {
        login
      }
      labels(first: 100) {
        nodes {
          ...LabelFragment
        }
      }
      refs(first: 100, refPrefix: "refs/heads/") {
        nodes {
          ...RefFragment
        }
      }
    }
  }
  ${GithubLabelFragment}
  ${GithubRefFragment}
`
