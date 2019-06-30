import React, { createContext, Dispatch, SetStateAction, useMemo, useState } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import UseContext from './UseContext/'
import PageTwo from './PageTwo/'

import './App.css'

interface ContextProps {
  user: string
  setUser: Dispatch<SetStateAction<string>>
}

// Creates a Context object. When React renders a component that subscribes to this Context object it will read
// the current context value from the closest matching Provider above it in the tree.
export const UserContext = createContext({ user: '' } as ContextProps)

const App: React.FC = () => {
  const [user, setUser] = useState('')

  // Pass a “create” function and an array of dependencies. useMemo will only recompute the memoized value when
  // one of the dependencies has changed. This optimization helps to avoid expensive calculations on every render.
  const value = useMemo(() => ({ user, setUser }), [user, setUser])

  return (
    <BrowserRouter>
      <UserContext.Provider value={value}>
        <Route component={UseContext} exact path="/" />
        <Route component={PageTwo} path="/page-2" />
      </UserContext.Provider>
    </BrowserRouter>
  )
}

export default App
