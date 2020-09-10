import { gql, useQuery } from "@apollo/client"
import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { nodes } from "../src/util"
import {
  QueryRepository,
  QueryRepository_repository,
} from "../types/QueryRepository"
import { GithubLabel, GithubLabelFragment } from "./Labels"
import { QuerySuspense } from "./QuerySuspense"
import { TabNav } from "@primer/components"
import { HeaderSlot } from "./Layout"
import { GithubRef, GithubRefFragment } from "./GithubRef"

export default function Page() {
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
  frag: QueryRepository_repository | null | undefined
}> = ({ frag }) => {
  const [tab, setTab] = useState(0)
  return (
    <>
      <HeaderSlot deps={[frag]}>
        {frag?.owner.login}/{frag?.name}
      </HeaderSlot>
      <TabNav aria-label="Main">
        {["Branches", "Issues", "Labels"].map((e, i) => (
          <TabNav.Link key={i} selected={tab === i} onClick={() => setTab(i)}>
            {e}
          </TabNav.Link>
        ))}
      </TabNav>
      {
        [
          <>
            {nodes(frag?.refs).map(e => (
              <p key={e.name}>
                <GithubRef key={e.name} frag={e}></GithubRef>
              </p>
            ))}
          </>,
          <></>,
          <>
            {nodes(frag?.labels).map(e => (
              <p key={e.name}>
                <GithubLabel key={e.name} frag={e}></GithubLabel>
              </p>
            ))}
          </>,
        ][tab]
      }
    </>
  )
}

const query = gql`
  query QueryRepository($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      owner {
        login
      }
      name
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
