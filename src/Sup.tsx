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

  return <div>Sup?</div>
}

export default Sup