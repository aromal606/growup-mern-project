import React from 'react'

const Card = ({children}) => {
  return (
    <div className='bg-white shadow-lg shadow-gray-300 rounded-md p-2 mb-3'>
      {children}
    </div>
  )
}

export default Card
