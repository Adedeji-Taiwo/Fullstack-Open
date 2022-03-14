import React from 'react'

const SinglePerson = ({person: {name, number}}) =>  <p>{name} {number}</p>

export default SinglePerson;