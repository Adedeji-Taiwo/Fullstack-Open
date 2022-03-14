import React from 'react';
import Header from './Header';
import Content from './Content';
import Total from './Total';


const Course = ({course: {name, parts}}) => {
    
    const total = parts.map(item => item.exercises)
                .reduce((acc, cur) => acc + cur);

  return (
    <>
         <Header name={name}/>
         <Content parts={parts}/>
         <Total total={total} />
    </>
  )
}

export default Course;