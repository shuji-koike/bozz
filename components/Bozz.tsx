import React, { useState, useCallback } from "react"
import { useBozz } from "~/hooks"
import styled from "styled-components"

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
  <StyledListItem>
    <StyledDetails open={open} label={`${repo.owner}/${repo.name}`}>
      <ul>
        <BozzBranches branches={branches} />
        <BozzPackages packages={packages} />
      </ul>
    </StyledDetails>
  </StyledListItem>
)

export const BozzBranches: React.FC<Pick<Repo, "branches">> = ({
  branches,
}) => (
  <StyledDetails open={open} label="branches" visible={!!branches.length}>
    <ul>
      {branches.map(({ name }) => (
        <li key={name}>
          <span>{name}</span>
        </li>
      ))}
    </ul>
  </StyledDetails>
)

export const BozzPackages: React.FC<Pick<Repo, "packages">> = ({
  packages,
}) => (
  <StyledDetails open={open} label="packages" visible={!!packages.length}>
    {packages.map(frag => (
      <li key={frag.path}>
        <BozzPackage {...frag} />
      </li>
    ))}
  </StyledDetails>
)

export const BozzPackage: React.FC<Package> = ({
  scripts,
  package: { name },
}) => (
  <StyledListItem label={name}>
    <StyledDetails open={open} label="scripts" visible={!!scripts}>
      <ul>
        {Object.entries(scripts || {}).map(([key, value]) => (
          <li key={key}>
            <span title={value}>{key}</span>
          </li>
        ))}
      </ul>
    </StyledDetails>
  </StyledListItem>
)

const ListItem: React.FC<{ label?: string }> = ({ label, children }) => (
  <>
    {label && <span>{label}</span>}
    {children}
  </>
)

export const StyledListItem = styled(ListItem)`
  color: red !important;
`

const Details: React.FC<
  React.DetailsHTMLAttributes<HTMLElement> & {
    label?: string
    visible?: boolean
  }
> = ({ label, visible = true, children, ...props }) =>
  visible ? (
    <details {...props}>
      <summary>{label}</summary>
      <div>{children}</div>
    </details>
  ) : (
    <></>
  )

export const StyledDetails = styled(Details)`
  > summary {
    outline: none;
  }
  > div {
    font-family: monospace;
  }
`
