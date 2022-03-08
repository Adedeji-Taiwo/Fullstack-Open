import React from 'react'

const Total = ({total: {exercise1, exercise2, exercise3}}) => {
  return (
     <p>Number of exercises: {exercise1 + exercise2 + exercise3}</p>
  )
}

export default Total