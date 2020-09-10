import React from "react"
import styled from "styled-components"
import { Auth } from "./Auth"

export const Header: React.FC = ({ children }) => {
  return (
    <StyledHeader>
      <StyledDiv>
        <h1>bozz</h1>
        <nav>{children}</nav>
      </StyledDiv>
      <Auth />
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  display: flex;
  padding: 4px 0;
  align-items: center;
`
const StyledDiv = styled.div`
  flex-grow: 1;

  > * {
    display: inline-block;
  }

  > h1 {
    margin: 0;
    margin-right: 1rem;
    font-size: 2rem;
    line-height: 2rem;
  }
`
