import React, { useState } from 'react'

import Sup from './Sup'
import useForm from './useForm'
import useFetch from './useFetch'

import './App.css'

const App: React.FC = () => {
  // useState example showing the two states of a counter
  const [{ count, count2 }, setCount] = useState({ count: 0, count2: 20 })

  // Typical use case for a custom hook, the form
  const { values, handleChange, handleSubmit } = useForm(() => ({ email: '', password: '' }))
  const submit = () => alert(`${values.email} / ${values.password}`)

  // Shows/hides the Sup component, which contains the useEffect example
  const [showSup, setShowSup] = useState(false)
  const toggleShowSup = () => setShowSup(!showSup)

  // Custom hook using useEffect and useState
  const [data, loading] = useFetch(`http://numbersapi.com/${count}/trivia`)

  return (
    <div className="App">
      <header className="App-header">
        <div>{loading ? '' : String(data)}</div>
        <button onClick={e => setCount(({ count, count2 }) => ({ count: count + 1, count2 }))}>one</button>
        <div>{count2}</div>
        <button onClick={e => setCount(({ count, count2 }) => ({ count, count2: count2 + 1 }))}>two</button>
        <br />
        <input name="email" onChange={handleChange} value={values.email} />
        <input name="password" onChange={handleChange} type="password" value={values.password} />
        <button onClick={handleSubmit(submit)}>submit</button>
        <br />
        <button onClick={toggleShowSup}>sup?</button>
        {showSup && <Sup />}
      </header>
    </div>
  )
}

export default App
