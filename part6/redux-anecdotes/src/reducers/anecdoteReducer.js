import { createSlice } from '@reduxjs/toolkit';


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload);
    },

    voteAnecdote(state, action) {
      const id = action.payload;
      const anecdoteToVote = state.find(n => n.id === id);
      const votedAnecdote = {
        ...anecdoteToVote, votes: anecdoteToVote.votes + 1
      }
      return state.map(anecdote => 
          anecdote.id === id ? votedAnecdote : anecdote
        )
    },
    setAnecdotes(state, action) {
      return action.payload;
    }
  }
})



export const { createAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;