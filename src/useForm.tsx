import { ChangeEvent, MouseEvent, useState } from 'react'

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

  return {
    handleChange: (event: ChangeEvent<HTMLInputElement>) => {
      event.persist()
      setValues(values => ({ ...values, [event.target.name]: event.target.value }))
    },
    handleSubmit: (cb: () => void) => (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      cb()
    },
    values
  }
}