import React, { useCallback } from "react"
import { useStorage } from "../hooks"

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> & {
  name: string
  storage?: Storage
}

export const Input: React.FC<InputProps> = ({
  name,
  placeholder = name,
  onChange,
  storage,
  ...props
}) => {
  const { value, setValue } = useStorage(name, storage)
  return (
    <input
      {...props}
      value={value}
      name={name}
      placeholder={placeholder}
      onChange={useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
          setValue(e.target.value)
          onChange?.(e)
        },
        [setValue, onChange]
      )}
    />
  )
}
