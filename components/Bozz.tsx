import React from "react"
import { useBozz } from "~/hooks"

export const Bozz: React.FC = () => {
  const bozz = useBozz()
  return (
    <>
      <textarea defaultValue={JSON.stringify(bozz)}></textarea>
    </>
  )
}
