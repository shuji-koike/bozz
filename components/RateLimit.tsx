import { gql, useQuery } from "@apollo/client"
import React from "react"
import styled from "styled-components"
import { QueryRateLimit } from "../types/QueryRateLimit"

export const RateLimit: React.FC = ({ children }) => {
  const { data, loading, error } = useQuery<QueryRateLimit>(gql`
    query QueryRateLimit {
      rateLimit {
        limit
        cost
        remaining
        resetAt
      }
    }
  `)
  if (loading) return <>Loading...</>
  if (error)
    return (
      <>
        {error.message}
        {children}
      </>
    )
  if (!data || !data.rateLimit) throw new Error()
  console.debug(`rateLimit: ${JSON.stringify(data.rateLimit)}}`)
  let message: React.ReactNode
  if (data.rateLimit.remaining! < 100) {
    message = <p style={{ color: "red" }}>github api rate limit exceeded!!!</p>
  } else if (data.rateLimit.remaining! / data.rateLimit.limit! < 0.25) {
    message = (
      <p style={{ color: "orange" }}>github api rate limit remaining is low!</p>
    )
  }
  return (
    <>
      {children}
      {message && (
        <StyledFooter>
          {message}
          <span>
            Github API rate limit remaining: ({data.rateLimit.remaining} /{" "}
            {data.rateLimit.limit})
          </span>
          <span> Resets at {new Date(data.rateLimit.resetAt!).toString()}</span>
        </StyledFooter>
      )}
    </>
  )
}

const StyledFooter = styled.footer`
  position: fixed;
  bottom: 0;
  z-index: 10001;
  font-family: monospace;
  * {
    margin: 0;
    padding: 0;
  }
`
