import React from 'react'

const StatisticLine = ({feedback, value}) => {
  return (
    <tr>
        <td>{feedback}</td><td>{value}</td>
    </tr>
  )
}

export default StatisticLine;