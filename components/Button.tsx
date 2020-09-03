import { Button as PrimerButton } from "@primer/components"
import React from "react"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: React.ReactNode | null
}

export const Button: React.FC<ButtonProps> = ({
  type = "button",
  label,
  ...props
}) => {
  return (
    <PrimerButton {...props} type={type}>
      {label}
    </PrimerButton>
  )
}
