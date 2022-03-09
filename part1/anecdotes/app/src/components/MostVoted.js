import React from 'react'
import Header from './Header';

const MostVoted = ({title, maxVoted, maxVotedCount}) => {

  const formattedMaxVotedCount = maxVotedCount > 1 ? "votes" : "vote"
  
  return (
    <div>
        <Header title = {title}/>
        <p>{maxVoted}</p>
        <p>has {maxVotedCount} {formattedMaxVotedCount}.</p>
    </div>
  )
}

export default MostVoted;