import React from 'react'
import StatisticLine from './StatisticLine';

const Feedback = ({ good, bad, ok, total, average, positive }) => {
  return (
    <div>
        <h1>Statistics</h1>
        <table>
            <thead><tr><th></th></tr></thead>
            <tbody>
                <StatisticLine feedback='Good:' value={good} />
                <StatisticLine feedback='Neutral:' value={ok} />
                <StatisticLine feedback='Bad:' value={bad}/>
                <StatisticLine feedback='total:' value={total} />
                <StatisticLine feedback='average:' value={average}/>
                <StatisticLine feedback='positive:' value={positive}/>
            </tbody>
        </table>
    </div>
  )
}

export default Feedback