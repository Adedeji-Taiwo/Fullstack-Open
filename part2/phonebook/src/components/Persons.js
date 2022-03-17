import React from 'react'
import Button from './Button'


const Persons = ({person: {name, number}, handleRemoval}) => {
   return(
        <p>
             <span>{name} {number}</span>{" "}
             <Button handleRemoval={handleRemoval}/>
        </p>
    )
}

export default Persons;