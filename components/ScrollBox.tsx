import React, { useEffect, useRef } from "react"
import styled from "styled-components"

export interface ScrollBoxEvent {
  x: number
  y: number
}

export const ScrollBox: React.FC<{
  onScroll?: (event: ScrollBoxEvent) => ScrollBoxEvent
}> = ({ onScroll, children }) => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    const listener = ({ target }: Event) => {
      if (!el || target !== el) return
      const width = el.scrollWidth - el.clientWidth
      const height = el.scrollHeight - el.clientHeight
      const ev = {
        x: el.scrollLeft / width,
        y: el.scrollTop / height,
      }
      if (onScroll) {
        const ret = onScroll(ev)
        el.scrollTo({
          left: ev.x !== ret.x ? ret.x * width : undefined,
          top: ev.y !== ret.y ? ret.y * height : undefined,
        })
      }
    }
    el?.addEventListener("scroll", listener, true)
    return () => el?.removeEventListener("scroll", listener)
  }, [onScroll])
  return <StyledDiv ref={ref}>{children}</StyledDiv>
}

const StyledDiv = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
`
