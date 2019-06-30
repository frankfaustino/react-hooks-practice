import React, { useEffect } from 'react'

const Sup: React.FC = () => {
  // useEffect is analagous to componentDidMount
  useEffect(() => {
    // this lambda function will be called at each render (or re-render)
    console.log('render')

    return () => {
      // this returned function is called at each component unmount
      // you can perform any clean up here
      console.log('unmount')
    }
  }, []) // whenever any values you place into the array changes, useEffect gets called

  // a component can have multiple useEffect calls
  useEffect(() => {
    // they're called in order
    console.log('render 2')

    const onMouseMove = (e: Event) => {
      console.log(e)
    }
    window.addEventListener('mousemove', onMouseMove)

    return () => {
      console.log('unmount 2')
      // let's clean up after ourselves 🧼
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return <div>Sup?</div>
}

export default Sup