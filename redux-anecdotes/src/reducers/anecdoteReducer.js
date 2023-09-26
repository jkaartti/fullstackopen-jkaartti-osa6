import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload
      const anecdote = state.find(a => a.id === id)
      const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
      const newState =
        state
          .map(a => a.id !== id ? a : newAnecdote)
          .sort((a, b) => ( b.votes - a.votes ))
      return newState
    },
    
    createAnecdote(state, action) {
      state.push(action.payload)
    },

    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export default anecdoteSlice.reducer
export const { vote, createAnecdote, setAnecdotes } = anecdoteSlice.actions