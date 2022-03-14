import React from 'react'

const Filter = ({search, handleSearch}) => {
  return (
    <div>
        Filter shown with: <input
        type="text"
        value={search}
        onChange = {handleSearch}
            />
      </div>
  )
}

export default Filter