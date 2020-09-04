import { useRouter } from "next/router"
import React from "react"
import Home from "~/components/Home"
import OrganizationPilePage from "~/components/OrganizationPile"
import RepositoryPile from "~/components/RepositoryPile"
import { Params } from "~/src/util"

export default function PileIndex() {
  const { query } = useRouter()
  if ("owner" in query && "name" in query) {
    return (
      <RepositoryPile
        owner={Params.string(query.owner)}
        name={Params.string(query.name)}
        limit={Params.number(query.limit)}
      />
    )
  }
  if ("login" in query) {
    return <OrganizationPilePage login={Params.string(query.login)} />
  }
  return <Home />
}
