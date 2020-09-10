import { BaseStyles } from "@primer/components"
import React, { createContext, useContext, useEffect, useState } from "react"
import { ToastContainer } from "react-toastify"
import styled from "styled-components"
import { Header } from "./Header"
import "react-toastify/dist/ReactToastify.css"

export const Layout: React.FC = ({ children }) => {
  const [layout, setLayout] = useState<LayoutState>({})
  return (
    <LayoutContext.Provider value={{ layout, setLayout }}>
      <BaseStyles as="main">
        <Header>{layout.nav}</Header>
        {children}
        <StyledToastContainer position="bottom-center" />
      </BaseStyles>
    </LayoutContext.Provider>
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

interface LayoutState {
  showHeader?: boolean
  showDrawer?: boolean
  nav?: React.ReactNode
}

export const LayoutContext = createContext<{
  layout: LayoutState
  setLayout: (layout: LayoutState) => void
}>({
  layout: {},
  setLayout: () => {},
})

export const HeaderSlot: React.FC<{
  deps?: ReadonlyArray<any>
}> = ({ deps, children }) => {
  const { layout, setLayout } = useContext(LayoutContext)
  useEffect(() => {
    setLayout({ ...layout, nav: children })
    return () => setLayout({ ...layout, nav: null })
  }, deps)
  return <></>
}
