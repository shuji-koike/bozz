import { Button as PrimerButton } from "@primer/components"
import React from "react"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string | null
}

export const Button: React.FC<ButtonProps> = ({
  type = "button",
  label,
  children,
  ...props
}) => {
  return (
    <PrimerButton {...props} title={label ?? undefined} type={type}>
      {children || label}
    </PrimerButton>
  )
}
