import React from 'react'
import { connect } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const Anecdote = ({anecdote, handleVote}) => (
    <li>
        {anecdote.content} has {' '}
        {anecdote.votes} {' '}
        <button onClick={handleVote}>vote</button>
    </li>
)



const AnecdoteList = (props) => {

                              
   
    const vote = (id) => {
        const anecdote = props.anecdotes.find(n => n.id === id);
        props.voteAnecdote(anecdote)
        props.setNotification(`You voted '${anecdote.content}.'`, 5000);
    };

   
  return (
    <ul>
        {props.anecdotes.map(anecdote =>
            <Anecdote 
                key={anecdote.id}
                anecdote={anecdote}
                handleVote={() => vote(anecdote.id)}
            />
        )}
    </ul>
  )
}

const mapStateToProps = (state) => {
    return {
        filter: state.filter,
        anecdotes: state.anecdote.filter(item => (item.content.toLowerCase()).includes(state.filter.toLowerCase()))
        .sort((a,b) => b.votes - a.votes),
    }
}

const mapDispatchToProps = {
    voteAnecdote,
    setNotification
}



const ConnectedAnecdoteLists = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteLists;