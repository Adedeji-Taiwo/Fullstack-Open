import React from 'react'

const Content = ({content: {part1, part2, part3, exercise1, exercise2, exercise3}}) => {
  return (
    <>
      <p>{part1}: {exercise1}</p>
      <p>{part2}: {exercise2}</p>
      <p>{part3}: {exercise3}</p>
    </>
  )
}

export default Content;