import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { notificationChange } from '../reducers/notificationReducer';

const Anecdote = ({anecdote, handleVote}) => (
    <li>
        {anecdote.content} has {' '}
        {anecdote.votes} {' '}
        <button onClick={handleVote}>vote</button>
    </li>
)



const AnecdoteList = () => {
    const dispatch = useDispatch();
    const filter = useSelector(state => state.filter)
    const anecdotes = [...(useSelector(state => state.anecdote))]
                            .filter(item => (item.content.toLowerCase()).includes(filter.toLowerCase()))
                            .sort((a,b) => b.votes - a.votes);

                            console.log(useSelector(state => state))              
   
    const vote = (id) => {
        const anecdote = anecdotes.find(n => n.id === id);
        dispatch(voteAnecdote(anecdote))
        dispatch(notificationChange(`You voted '${anecdote.content}.'`, 5000));
    };

   
    console.log(filter);
  return (
    <ul>
        {anecdotes.map(anecdote =>
            <Anecdote 
                key={anecdote.id}
                anecdote={anecdote}
                handleVote={() => vote(anecdote.id)}
            />
        )}
    </ul>
  )
}

export default AnecdoteList;