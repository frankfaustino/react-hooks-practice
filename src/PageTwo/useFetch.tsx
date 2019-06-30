import { useEffect, useState } from 'react'

interface State {
  data: any
  loading: boolean
}

const useFetch = (url: RequestInfo) => {
  const [state, setState] = useState({ data: '', loading: false })

  useEffect(() => {
    setState((state: State) => ({ data: state.data, loading: true }))

    // useEffect cannot by async (this is the workaround)
    ;(async () => {
        const response: Response = await fetch(url)
        const data: string = await response.text()

        setState({ data, loading: false })
    })().catch(e => console.error(e.message))

  }, [url, setState])

  return [state.data, state.loading]
}

export default useFetch
