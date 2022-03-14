import React from 'react'

const Filter = ({search, handleSearch}) => {
  return (
    <div>
          Find countries: <input 
          type="text"
          value={search}
          onChange={handleSearch}
           />
      </div>
  )
}

export default Filter;