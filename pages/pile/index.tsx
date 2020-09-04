import { useRouter } from "next/router"
import React from "react"
import Home from "~/components/Home"
import OrganizationPilePage from "~/components/OrganizationPile"
import { first } from "~/src/util"

export default function PileIndex() {
  const { query } = useRouter()
  if ("owner" in query && "name" in query) {
  }
  if ("login" in query) {
    return <OrganizationPilePage login={first(query).login} />
  }
  return <Home />
}
