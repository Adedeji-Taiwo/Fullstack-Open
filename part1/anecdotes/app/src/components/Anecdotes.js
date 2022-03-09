import React from 'react'

const Anecdotes = ({anecdotes, voteCount}) => {
    const formattedVotedCount = voteCount > 1 ? "votes" : "vote";

  return (
    <div>
        <p>{anecdotes}</p>
        <p>has {voteCount} {formattedVotedCount}.</p>
    </div>
  )
}

export default Anecdotes;