import { gql, useQuery } from "@apollo/client"
import dayjs from "dayjs"
import React, { useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { nonNull } from "../src/util"
import { GithubMilestoneFragment } from "../types/GithubMilestoneFragment"
import { QueryMilestones } from "../types/QueryMilestones"
import { GanttHeader } from "./GanttHeader"
import { GithubItem } from "./GithubItem"
import { GithubItemFragment } from "./GithubItem"
import { QuerySuspense } from "./QuerySuspense"
import { ScrollBox } from "./ScrollBox"

export default function GanttPage() {
  const params = useParams<{ owner: string; name: string }>()
  const { data, loading, error } = useQuery<QueryMilestones>(query, {
    variables: params,
  })
  return (
    <QuerySuspense loading={loading} error={error}>
      {data && <RepositoryGantt data={data} />}
    </QuerySuspense>
  )
}

export const RepositoryGantt: React.FC<{ data: QueryMilestones }> = ({
  data: { repository },
}) => (
  <Gantt frag={repository?.milestones?.nodes?.filter(nonNull)}>
    <GithubItem
      frag={repository}
      label={`${repository?.owner.login}/${repository?.name}`}
    />
  </Gantt>
)

export const Gantt: React.FC<{ frag?: GithubMilestoneFragment[] }> = ({
  frag = [],
  children,
}) => {
  const ref = useRef<HTMLTableElement>(null)
  const dates = [
    ...frag.map(e => e?.createdAt),
    ...frag.map(e => e?.dueOn),
    ...frag.map(e => e!.issues.nodes!.map(e => e!.createdAt)).flat(),
    ...frag.map(e => e!.pullRequests.nodes!.map(e => e!.createdAt)).flat(),
  ]
    .map(e => new Date(e))
    .sort((a, b) => a.getTime() - b.getTime())
  const columns = getDateArray(dates[0], dates[dates.length - 1])
  const active = {
    milestone: frag[0],
    issue: frag[0]?.issues.nodes?.[0],
  }
  return (
    <ScrollBox>
      <StyledTable ref={ref}>
        <GanttHeader columns={columns}>{children}</GanttHeader>
        <tbody>
          {frag.map(
            milestone =>
              milestone && (
                <React.Fragment key={milestone.number}>
                  <tr>
                    <th onClick={() => console.debug(milestone)}>
                      <GithubItem frag={milestone} />
                    </th>
                    <td
                      colSpan={
                        columns.findIndex(
                          e => e > new Date(milestone.createdAt)
                        ) - 1
                      }></td>
                    <th
                      colSpan={
                        columns.findIndex(e => e > new Date(milestone.dueOn)) -
                        columns.findIndex(
                          e => e > new Date(milestone.createdAt)
                        ) +
                        1
                      }>
                      <GithubItem
                        frag={milestone}
                        label={dayjs(milestone.dueOn).format("YYYY/MM/DD")}
                      />
                    </th>
                    <td
                      colSpan={
                        columns.length -
                        columns.findIndex(e => e > new Date(milestone.dueOn))
                      }></td>
                  </tr>
                  {[
                    ...milestone.issues.nodes!,
                    ...milestone.pullRequests.nodes!,
                  ].map(issue => (
                    <tr key={issue?.number}>
                      <td onClick={() => console.debug(issue)}>
                        <GithubItem frag={issue!} label={`#${issue?.number}`}>
                          {issue?.title}
                        </GithubItem>
                      </td>
                      <td
                        colSpan={
                          columns.findIndex(
                            e => e > new Date(issue?.createdAt)
                          ) - 1
                        }></td>
                      <td
                        colSpan={
                          columns.findIndex(
                            e => e > new Date(milestone.dueOn)
                          ) -
                          columns.findIndex(
                            e => e > new Date(issue?.createdAt)
                          ) +
                          1
                        }>
                        <Section
                          active={
                            active.milestone === milestone &&
                            active.issue === issue
                          }>
                          {issue?.assignees?.nodes?.map(e => (
                            <span key={e?.login}>
                              <img
                                src={e?.avatarUrl}
                                alt={e?.login}
                                width={16}
                              />
                              <span>{e?.login}</span>
                            </span>
                          ))}
                          <GithubItem
                            frag={issue!}
                            label={`#${issue?.number}`}
                          />
                        </Section>
                      </td>
                      <td
                        colSpan={
                          columns.length -
                          columns.findIndex(e => e > new Date(milestone.dueOn))
                        }>
                        {issue?.labels?.nodes?.map(e => (
                          <span
                            key={e?.name}
                            style={{ background: "#" + e?.color }}>
                            {e?.name}
                          </span>
                        ))}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              )
          )}
        </tbody>
      </StyledTable>
    </ScrollBox>
  )
}

export const Section: React.FC<{
  active: boolean
}> = ({ active, children }) => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (active)
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "end",
      })
  }, [active])
  return <div ref={ref}>{children}</div>
}

const MilestoneFragment = gql`
  fragment GithubMilestoneFragment on Milestone {
    ...GithubItemFragmentMilestone
    issues(first: $first) {
      nodes {
        ...GithubItemFragmentIssue
        ...GithubAssigneesFragment
        ...GithubLabelsFragment
      }
    }
    pullRequests(first: $first) {
      nodes {
        ...GithubItemFragmentPullRequest
        ...GithubAssigneesFragment
        ...GithubLabelsFragment
      }
    }
  }
  fragment GithubAssigneesFragment on Assignable {
    assignees(first: 10) {
      nodes {
        avatarUrl
        login
      }
    }
  }
  fragment GithubLabelsFragment on Labelable {
    labels(first: 10) {
      nodes {
        name
        color
      }
    }
  }
`

const query = gql`
  query QueryMilestones($owner: String!, $name: String!, $first: Int = 25) {
    repository(owner: $owner, name: $name) {
      databaseId
      ...GithubItemFragmentRepository
      milestones(first: 10, orderBy: { field: DUE_DATE, direction: DESC }) {
        nodes {
          ...GithubMilestoneFragment
        }
      }
    }
  }
  ${GithubItemFragment.PullRequest}
  ${GithubItemFragment.Issue}
  ${GithubItemFragment.Repository}
  ${GithubItemFragment.Milestone}
  ${MilestoneFragment}
`

const StyledTable = styled.table`
  border-spacing: 0;
  > thead > tr > * {
    position: sticky;
    top: 0;
    min-width: 3rem;
    background: #fff;
    z-index: 2;
  }
  > thead > tr > th {
    left: 0;
    min-width: 3rem;
    z-index: 3;
  }
  > tbody > tr > :first-child {
    position: sticky;
    left: 0;
    padding: 8px;
    min-width: 200px;
    max-width: 400px;
    background: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: top;
    z-index: 1;
  }
  > tbody > tr > th:nth-child(3) {
    text-align: right;
  }
  > tbody > tr > td:nth-child(3) {
    text-align: right;
  }
`

function getDateArray(start: Date, end: Date) {
  return Array(dayjs(end).startOf("d").diff(dayjs(start).endOf("d"), "d") + 90)
    .fill(null)
    .map((_, i) => dayjs(start).startOf("d").add(i, "d").toDate())
}
