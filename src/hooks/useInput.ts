import { useState, ChangeEvent, SetStateAction, Dispatch } from 'react'

type FormValues = {
  [key: string]: string
}

type UseInput<T extends FormValues> = {
  values: T
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  setValues: Dispatch<SetStateAction<T>>
}

export function useInput<T extends FormValues>(inputValues: T): UseInput<T> {
  const [values, setValues] = useState<T>(inputValues)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    setValues((prevValues) => ({ ...prevValues, [name]: value }))
  }

  return { values, handleChange, setValues }
}
