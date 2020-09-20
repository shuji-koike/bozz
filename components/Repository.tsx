import { gql, useQuery } from "@apollo/client"
import { TabNav } from "@primer/components"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { RefFragment } from "~/types/RefFragment"
import { nodes } from "../src/util"
import {
  QueryRepository,
  QueryRepositoryVariables,
} from "../types/QueryRepository"
import { GithubRef, GithubRefFragment } from "./GithubRef"
import { GitLog } from "./GitLog"
import { GithubLabel, GithubLabelFragment } from "./Labels"
import { HeaderSlot } from "./Layout"
import { QuerySuspense } from "./QuerySuspense"

export default function RepositoryPage() {
  const { data, loading, error } = useQuery<
    QueryRepository,
    QueryRepositoryVariables
  >(query, {
    variables: useParams(),
  })
  return (
    <QuerySuspense loading={loading} error={error}>
      <Repository frag={data?.repository} />
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
    <section>
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
    </section>
  )
}

const BranchesTab: React.FC<{
  frag: QueryRepository["repository"] | null | undefined
  onSelectItem?: (frag: RefFragment) => void
}> = ({ frag, onSelectItem }) => {
  return (
    <StyledBranchesTab>
      {nodes(frag?.refs).map(e => (
        <div key={e.name}>
          <GithubRef frag={e} onSelectItem={onSelectItem}></GithubRef>
        </div>
      ))}
    </StyledBranchesTab>
  )
}

const StyledBranchesTab = styled.section`
  display: table;
  > * {
    display: table-row;
  }
  > * > * {
    display: table-cell;
  }
`

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
