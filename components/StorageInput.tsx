import React, { useCallback } from "react"
import { useStorage } from "../src/hooks"

export type StorageInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string
  storage?: Storage
}

export const StorageInput: React.FC<StorageInputProps> = ({
  name,
  placeholder = name,
  onChange,
  storage = window.localStorage,
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
