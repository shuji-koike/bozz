import { ApolloError } from "@apollo/client"
import React from "react"
import { toast } from "react-toastify"

interface QuerySuspenseProps {
  error?: ApolloError
  loading: boolean
}

export const QuerySuspense: React.FC<QuerySuspenseProps> = ({
  error,
  loading,
  children,
}) => {
  if (loading) return <p>Loading...</p>
  if (error) toast.error(error.message)
  return (
    <>
      {children}
      {error?.graphQLErrors.map((e, i) => (
        <p key={i}>{e.message}</p>
      ))}
    </>
  )
}
