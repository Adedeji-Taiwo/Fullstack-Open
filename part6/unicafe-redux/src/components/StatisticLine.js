import React from 'react'


const style = {
    fontWeight: 600
}


const StatisticLine = ({feedback, value}) => {
  return (
    <tr>
        <td style={style}>{feedback}</td><td>{value}</td>
    </tr>
  )
}

export default StatisticLine;