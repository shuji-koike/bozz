import React from "react"
import { useEffect } from "react"
import Home from "~/components/Home"

export default function Index() {
  useEffect(() => {
    fetch("/api/state")
      .then(e => e.json())
      .then(res => {
        console.debug(res)
      })
  }, [])
  return <Home />
}
