import React, { useCallback } from "react"
import { useStorage } from "../src/util"

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
  const [value, setValue] = useStorage(name, storage)
  return (
    <input
      {...props}
      value={value as string} //TODO
      name={name}
      placeholder={placeholder}
      onChange={useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
          ;(setValue as (value: string) => {})(e.target.value) //TODO
          onChange?.(e)
        },
        [setValue, onChange]
      )}
    />
  )
}
