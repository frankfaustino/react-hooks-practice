import React, { createContext, useContext } from 'react'
import { Link } from 'react-router-dom'

import { UserContext } from '../App'

const timeout = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const login = async () => {
  await timeout(2000)
  return 'jamie'
}

const UseContext: React.FC = () => {
  // useContext accepts a context object (return from createContext)
  // returns current context value for given context
  const { user, setUser } = useContext(UserContext)

  const handleLogin = async () => {
    const loggedInUser = await login()
    setUser(loggedInUser)
  }

  return (
    <div className="App">
      <header className="App-header">
        <Link to="/page-2">Page 1</Link>
        {JSON.stringify(user)}
        <button onClick={handleLogin}>login</button>
      </header>
    </div>
  )
}

export default UseContext
