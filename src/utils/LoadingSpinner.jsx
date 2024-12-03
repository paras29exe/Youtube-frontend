import React from 'react'

function LoadingSpinner({width = "2rem"}) {
  return (
    <div className={`w-[${width} ]aspect-square mx-auto mt-5 border-4 border-white border-t-transparent rounded-full animate-spin`}></div>
  )
}

export default LoadingSpinner