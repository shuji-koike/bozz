import React, { useCallback } from "react"

type FormProps = React.FormHTMLAttributes<HTMLFormElement>

export const Form: React.FC<FormProps> = ({ onSubmit, children, ...props }) => {
  return (
    <form
      {...props}
      onSubmit={useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
          onSubmit?.(e)
          e.preventDefault()
        },
        [onSubmit]
      )}>
      {children}
    </form>
  )
}
