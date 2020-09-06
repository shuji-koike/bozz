import React, { useState } from "react"
import { useBozz } from "~/hooks"
import styled from "styled-components"
import { Breadcrumb, BranchName, ButtonGroup, Button } from "@primer/components"
import { counterSlice } from "~/store"
import { useDispatch, useSelector } from "react-redux"

export const Bozz: React.FC = () => {
  const bozz = useBozz()
  useSelector<State>(e => e.count)
  return (
    <>
      {bozz.repos?.map(repo => (
        <BozzRepo key={repo.path} {...repo} />
      ))}
    </>
  )
}

export const BozzRepo: React.FC<Repo> = ({ packages, branches, ...repo }) => {
  const [open, setOpen] = useState(true)
  return (
    <StyledDetails
      open={open}
      onToggle={() => setOpen(open)}
      label={
        <Breadcrumb>
          <Breadcrumb.Item>{repo.owner}</Breadcrumb.Item>
          <Breadcrumb.Item>{repo.name}</Breadcrumb.Item>
        </Breadcrumb>
      }>
      <ul>
        <BozzBranches branches={branches} />
        <BozzPackages packages={packages} />
      </ul>
    </StyledDetails>
  )
}

export const BozzBranches: React.FC<Pick<Repo, "branches">> = ({
  branches,
}) => {
  return (
    <StyledDetails
      label={branches
        .filter(e => e.refname.startsWith("refs/heads/"))
        .map(e => (
          <BozzBranch key={e.refname} branch={e}></BozzBranch>
        ))}
      visible={!!branches.length}>
      {branches.map(e => (
        <BozzBranch key={e.refname} branch={e}></BozzBranch>
      ))}
    </StyledDetails>
  )
}

export const BozzBranch: React.FC<{ branch: GitBranch }> = ({ branch }) => {
  return (
    <StyledBranchName>
      {branch.refname.replace(/^refs\/(heads|remotes|tags)\//, "")}
      {branch.ahead ? " *" + branch.ahead : ""}
      {branch.behind ? " ~" + branch.behind : ""}
    </StyledBranchName>
  )
}

const StyledBranchName = styled(BranchName)`
  & + & {
    margin-left: 1em;
  }
`

export const BozzPackages: React.FC<Pick<Repo, "packages">> = ({
  packages,
}) => {
  return (
    <>
      {packages.map(
        pkg =>
          pkg.scripts &&
          Object.keys(pkg.scripts).length && (
            <StyledListItem key={pkg.path} label={pkg.package.name}>
              <BozzPackage {...pkg} />
            </StyledListItem>
          )
      )}
    </>
  )
}

export const BozzPackage: React.FC<Package> = ({ scripts }) => {
  const dispatch = useDispatch()
  return (
    <StyledDetails
      visible={!!scripts}
      label={
        <ButtonGroup>
          {Object.entries(scripts || {})
            .slice(0, 10)
            .map(([key, value]) => (
              <Button
                key={key}
                title={value}
                onClick={() => dispatch(counterSlice.actions.increment())}>
                {key}
              </Button>
            ))}
        </ButtonGroup>
      }>
      <pre>{JSON.stringify(scripts, null, 2)}</pre>
    </StyledDetails>
  )
}

const ListItem: React.FC<{ label?: React.ReactNode; visible?: boolean }> = ({
  label,
  visible = true,
  children,
}) =>
  visible ? (
    <div>
      {label && <span>{label}</span>}
      {children}
    </div>
  ) : (
    <></>
  )

export const StyledListItem = styled(ListItem)``

const Details: React.FC<
  React.DetailsHTMLAttributes<HTMLElement> & {
    label?: React.ReactNode
    visible?: boolean
  }
> = ({ label, visible = true, children, ...props }) =>
  visible ? (
    <details {...props}>
      <summary>{label}</summary>
      <>{children}</>
    </details>
  ) : (
    <></>
  )

export const StyledDetails = styled(Details)`
  > summary {
    display: inline-block;
    outline: none;
  }
  > summary > * {
    display: inline-block;
  }
`
