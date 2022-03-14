import React from 'react'
import SinglePerson from './SinglePerson'
import NotFound from './NotFound'


const Persons = ({filtered}) => {
  return (
     <div>
           {filtered && filtered.length > 0 ? (
             filtered.map(person => <SinglePerson key = {person.name} person={person}/>)
           ) : (
             <NotFound />
           )}
      </div>
  )
}

export default Persons