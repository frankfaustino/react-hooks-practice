import React, { useState, useEffect } from 'react'

import Sup from './Sup'
import Todos from './Todos'
import useForm from './useForm'
import useFetch from './useFetch'

import './App.css'

const App: React.FC = () => {
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
        <div>{loading ? '' : String(data)}</div>
        <button onClick={() => setCount((c: number) => c + 1)}>one</button>
        <div>{count2}</div>
        <button onClick={() => setCount2((c: number) => c + 1)}>two</button>
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

export default App
