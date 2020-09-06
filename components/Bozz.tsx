import {
  Breadcrumb,
  BranchName,
  ButtonGroup,
  Button,
  CounterLabel,
} from "@primer/components"
import React, { useState, useRef, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { BozzContext } from "~/components/App"
import { counterSlice } from "~/src/store"

export const Bozz: React.FC = () => {
  const bozz = useContext(BozzContext)
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
  const [open, setOpen] = useState<boolean | undefined>()
  return (
    <StyledDetails
      label={
        !open &&
        branches
          .filter(e => e.refname.startsWith("refs/heads/"))
          .map(branch => (
            <BozzBranch key={branch.refname} branch={branch}></BozzBranch>
          ))
      }
      visible={!!branches.length}
      onChangeOpen={setOpen}>
      {branches.map(branch => (
        <BozzBranch key={branch.refname} branch={branch}></BozzBranch>
      ))}
    </StyledDetails>
  )
}

export const BozzBranch: React.FC<{ branch: GitBranch }> = ({ branch }) => {
  function backgroundColor() {
    if (branch.objecttype === "tag") return "#FBE6FF"
    if (branch.refname.startsWith("refs/heads/")) return "#E6F7FF"
    if (branch.refname.startsWith("refs/remotes/")) return "#FFE6E6"
    return "#eee"
  }
  return (
    <StyledBranchName backgroundColor={backgroundColor()}>
      {branch.refname.replace(/^refs\/(heads|remotes|tags)\//, "")}
      <StyledCounterLabel>
        {branch.ahead ? "" + branch.ahead : ""}
      </StyledCounterLabel>
      <StyledCounterLabel>
        {branch.behind ? "~" + branch.behind : ""}
      </StyledCounterLabel>
      <StyledCounterLabel>{branch.objectname.slice(0, 7)}</StyledCounterLabel>
    </StyledBranchName>
  )
}

const StyledCounterLabel = styled(CounterLabel)``
const StyledBranchName = styled(BranchName)`
  & + & {
    margin-left: 1em;
  }
  ${StyledCounterLabel} {
    margin-left: 0.5em;
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
}) => {
  return visible ? (
    <div>
      {label && <span>{label}</span>}
      {children}
    </div>
  ) : (
    <></>
  )
}

export const StyledListItem = styled(ListItem)``

const Details: React.FC<
  React.DetailsHTMLAttributes<HTMLElement> & {
    label?: React.ReactNode
    visible?: boolean
    onChangeOpen?: (open: boolean | undefined) => void
  }
> = ({ label, visible = true, onChangeOpen, children, ...props }) => {
  const ref = useRef<HTMLDetailsElement>(null)
  return visible ? (
    <details
      ref={ref}
      onToggle={() => onChangeOpen?.(ref.current?.open)}
      {...props}>
      <summary>{label}</summary>
      <>{children}</>
    </details>
  ) : (
    <></>
  )
}

export const StyledDetails = styled(Details)`
  > summary {
    display: inline-block;
    outline: none;
  }
  > summary > * {
    display: inline-block;
  }
`
