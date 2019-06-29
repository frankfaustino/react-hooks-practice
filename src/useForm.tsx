import React, { ChangeEvent, MouseEvent, useState } from 'react'

interface UseFormReturnValue {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (cb: () => void) => (event: MouseEvent<HTMLButtonElement>) => void
  values: InitialValues
}

interface InitialValues {
  email: string
  password: string
}

export const useForm = (callback: () => InitialValues): UseFormReturnValue => {
  const [values, setValues] = useState(callback)

  const handleSubmit = (cb: () => void) => (event: MouseEvent<HTMLButtonElement>) => {
    if (event) event.preventDefault()
    cb()
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist()
    setValues(values => ({ ...values, [event.target.name]: event.target.value }))
  }

  return {
    handleChange,
    handleSubmit,
    values
  }
}