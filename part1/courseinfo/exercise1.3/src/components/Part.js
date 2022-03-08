import React from 'react'

const Part = ({parts: {name, exercises}}) => {
  return (
    <div>{name}: {exercises}</div>
  )
}

export default Part;