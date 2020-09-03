import React from "react"
import { ToastContainer } from "react-toastify"
import styled from "styled-components"
import { Header } from "./Header"

export const Layout: React.FC = ({ children }) => {
  return (
    <main>
      <Header></Header>
      {children}
      <StyledToastContainer position="bottom-center" />
    </main>
  )
}

const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast-body {
    font-size: 0.8rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .Toastify__toast-body:hover {
    max-height: auto;
    white-space: initial;
  }
`
