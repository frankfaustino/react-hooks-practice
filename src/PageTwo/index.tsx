
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Sup from './Sup'
import Todos from './Todos'
import useForm from './useForm'
import useFetch from './useFetch'

const PageTwo: React.FC = () => {
  // useState example showing the two states of a counter
  const [count, setCount] = useState(JSON.parse(localStorage.getItem('count') || '' + 1))
  const [count2, setCount2] = useState(20)

  // Typical use case for a custom hook, the form
  const { values, handleChange, handleSubmit } = useForm(() => ({ email: '', password: '' }))
  const submit = () => alert(`${values.email} / ${values.password}`)

  // Shows/hides the Sup component, which contains the useEffect example
  const [showSup, setShowSup] = useState(false)
  const toggleShowSup = () => setShowSup(!showSup)

  // Custom hook using useEffect and useState
  const [data, loading] = useFetch(`http://numbersapi.com/${count}/trivia`)

  // useEffect w/ localStorage
  useEffect(() => {
    localStorage.setItem('count', count)
    return () => {
      localStorage.removeItem('count')
    }
  }, [count])

  return (
    <div className="App">
      <header className="App-header">
        <Link to="/">Page 1</Link>
        <button onClick={() => setCount((c: number) => c + 1)}>⚡️</button>
        <div className="count">{loading ? '' : String(data)}</div>
        <button onClick={() => setCount2((c: number) => c + 1)}>🔥</button>
        <div className="count">{count2}</div>
        <br />
        <input name="email" onChange={handleChange} value={values.email} />
        <input name="password" onChange={handleChange} type="password" value={values.password} />
        <button onClick={handleSubmit(submit)}>submit</button>
        <br />
        <button onClick={toggleShowSup}>sup?</button>
        {showSup && <Sup />}
        <br />
        <Todos />
      </header>
    </div>
  )
}

export default PageTwo
