import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';


const Anecdote = ({anecdote, handleVote}) => (
    <li>
        {anecdote.content} has {' '}
        {anecdote.votes} {' '}
        <button onClick={handleVote}>vote</button>
    </li>
)



const AnecdoteList = () => {
    const dispatch = useDispatch();
    const anecdotes = useSelector(state => state.sort((a, b) => {
       if (a.votes > b.votes)  return -1;
        if (a.votes < b.votes) return 1;
        return 0;  
    }          
    ));

  return (
    <ul>
        {anecdotes.map(anecdote =>
            <Anecdote 
                key={anecdote.id}
                anecdote={anecdote}
                handleVote={() => dispatch(vote(anecdote.id))}
            />
        )}
    </ul>
  )
}

export default AnecdoteList;