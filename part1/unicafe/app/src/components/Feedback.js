import React from 'react'
import StatisticLine from './StatisticLine'


const Feedback = ({good, neutral, bad, total, average, positive}) => {
  return (
    <div>
        <h1>Statistics</h1>
        <table>
         <thead><tr><th></th></tr></thead>
          <tbody>
            <StatisticLine feedback="Good" value = {good}/>
            <StatisticLine feedback="neutral" value = {neutral}/>
            <StatisticLine feedback="bad" value = {bad}/>
            <StatisticLine feedback = "all" value = {total}/>
            <StatisticLine feedback = "Average" value = {average}/>
            <StatisticLine feedback = "Positive" value = {`${positive} %`}/>
          </tbody>
        </table>
    </div>
  )
}

export default Feedback