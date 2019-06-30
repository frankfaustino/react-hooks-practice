import React, { ChangeEvent, MouseEvent, useReducer, useState } from 'react'

// https://www.sumologic.com/blog/usereducer-react-hook-typescript/
type Todos = {
  text: string
  completed: boolean
}

type State = {
  todos: Todos[]
  todoCount: number
}

type Action =
  | { type: 'add', text: string }
  | { type: 'toggle', index: number }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'add':
      return { todos: [...state.todos, { text: action.text, completed: false }], todoCount: state.todoCount + 1 }
    case 'toggle':
      return { ...state, todos: state.todos.map((t, i) => i === action.index ? { ...t, completed: !t.completed } : t) }
    default:
      return state
  }
}

const Todos: React.FC = () => {
  const initialState: State = { todos: [], todoCount: 0 }

  // 🔥 Reducer Hook: lets you manage local state of complex components with a reducer
  const [state, dispatch] = useReducer(reducer, initialState)
  const [text, setText] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)

  const handleClick = (index: number) => (_: MouseEvent<HTMLDivElement>) => dispatch({ type: 'toggle', index })

  return (
    <form onSubmit={e => {
      e.preventDefault()
      dispatch({ type: 'add', text })
      setText('')
    }}>
      <input value={text} onChange={handleChange} />
      {state.todos.map(({ completed, text }, i) => (
        <div key={text + i} onClick={handleClick(i)} style={{ textDecoration: completed ? 'line-through' : '' }}>{text}</div>)
      )}
    </form>
  )
}

export default Todos
