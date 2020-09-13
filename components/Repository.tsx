import { gql, useQuery } from "@apollo/client"
import { TabNav } from "@primer/components"
import React, { memo, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { RefFragment } from "~/types/RefFragment"
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
      <section>
        <Repository frag={data?.repository} />
      </section>
    </QuerySuspense>
  )
}

const Repository: React.FC<{
  frag?: QueryRepository["repository"]
}> = ({ frag }) => {
  const [tab, setTab] = useState(0)
  const [branch, setBranch] = useState<RefFragment | undefined>()
  useEffect(() => branch && setTab(3), [branch])
  if (!frag) return <></>
  return (
    <>
      <HeaderSlot deps={[frag]}>
        {frag.owner.login}/{frag.name}
      </HeaderSlot>
      <TabNav aria-label="Main">
        {["Branches", "Issues", "Labels", "History"].map((e, i) => (
          <TabNav.Link key={i} selected={tab === i} onClick={() => setTab(i)}>
            {e}
          </TabNav.Link>
        ))}
      </TabNav>
      {[
        () => <BranchesTab frag={frag} onSelectItem={setBranch} />,
        () => <></>,
        () => <LabelsTab frag={frag} />,
        () => <GitLog repo={frag} branch={branch} />,
      ][tab]()}
    </>
  )
}

const BranchesTab: React.FC<{
  frag: QueryRepository["repository"] | null | undefined
  onSelectItem?: (frag: RefFragment) => void
}> = memo(({ frag, onSelectItem }) => {
  return (
    <section>
      {nodes(frag?.refs).map(e => (
        <p key={e.name}>
          <GithubRef
            key={e.name}
            frag={e}
            onSelectItem={onSelectItem}></GithubRef>
        </p>
      ))}
    </section>
  )
})

const LabelsTab: React.FC<{
  frag: QueryRepository["repository"] | null | undefined
}> = memo(({ frag }) => {
  return (
    <section>
      {nodes(frag?.labels).map(e => (
        <p key={e.name}>
          <GithubLabel key={e.name} frag={e}></GithubLabel>
        </p>
      ))}
    </section>
  )
})

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
