import { useState, ChangeEvent, SetStateAction, Dispatch } from 'react'

type FormValues = {
  [key: string]: string
}

type UseInput = {
  values: FormValues
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  setValues: Dispatch<SetStateAction<FormValues>>
}

export function useInput(inputValues: FormValues = {}): UseInput {
  const [values, setValues] = useState<FormValues>(inputValues)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    setValues((prevValues) => ({ ...prevValues, [name]: value }))
  }

  return { values, handleChange, setValues }
}
