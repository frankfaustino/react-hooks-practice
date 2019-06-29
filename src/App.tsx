import React, { useState } from 'react'

import { useForm } from './useForm'

import './App.css'

const App: React.FC = () => {
  const [{ count, count2 }, setCount] = useState({ count: 10, count2: 20 })
  const { values, handleChange, handleSubmit } = useForm(() => ({ email: '', password: '' }))
  const submit = () => alert(`${values.email} / ${values.password}`)

  return (
    <div className="App">
      <header className="App-header">
        <div>{count}</div>
        <div>{count2}</div>
        <button onClick={e => setCount(({ count, count2 }) => ({ count: count + 1, count2 }))}>one</button>
        <button onClick={e => setCount(({ count, count2 }) => ({ count, count2: count2 + 1 }))}>two</button>
        <br />
        <input name="email" onChange={handleChange} value={values.email} />
        <input name="password" onChange={handleChange} type="password" value={values.password} />
        <button onClick={handleSubmit(submit)}>submit</button>
      </header>
    </div>
  )
}

export default App
