import React from 'react'
import Part from './Part';

const Content = ({part1, part2, part3}) => {
  return (
    <>
        <Part parts={part1}/>
        <Part parts={part2}/>
        <Part parts={part3}/>
    </>
  )
}

export default Content;