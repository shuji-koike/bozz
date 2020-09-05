import React, { useState, useCallback } from "react"
import { useBozz } from "~/hooks"
import styled from "styled-components"
import { Breadcrumb, BranchName, ButtonGroup, Button } from "@primer/components"

let open = true

export const Bozz: React.FC = () => {
  const bozz = useBozz()
  const [open, setOpen] = useState(true)
  const onToggle = useCallback(() => setOpen(!open), [open])
  onToggle //TODO
  return (
    <>
      {bozz.repos?.map(repo => (
        <BozzRepo key={repo.path} {...repo} />
      ))}
    </>
  )
}

export const BozzRepo: React.FC<Repo> = ({ packages, branches, ...repo }) => (
  <StyledDetails
    open={open}
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

export const BozzBranches: React.FC<Pick<Repo, "branches">> = ({
  branches,
}) => (
  <StyledDetails
    label={branches
      .filter(() => true)
      .map(e => (
        <BozzBranch key={e.name} {...e}></BozzBranch>
      ))}
    visible={!!branches.length}>
    {branches.map(e => (
      <BozzBranch key={e.name} {...e}></BozzBranch>
    ))}
  </StyledDetails>
)

export const BozzBranch: React.FC<GitBranch> = ({ name }) => (
  <BranchName>{name}</BranchName>
)

export const BozzPackages: React.FC<Pick<Repo, "packages">> = ({
  packages,
}) => (
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

export const BozzPackage: React.FC<Package> = ({ scripts }) => (
  <StyledDetails
    visible={!!scripts}
    label={
      <ButtonGroup>
        {Object.entries(scripts || {})
          .slice(0, 10)
          .map(([key, value]) => (
            <Button key={key} title={value}>
              {key}
            </Button>
          ))}
      </ButtonGroup>
    }>
    <pre>{JSON.stringify(scripts, null, 2)}</pre>
  </StyledDetails>
)

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
