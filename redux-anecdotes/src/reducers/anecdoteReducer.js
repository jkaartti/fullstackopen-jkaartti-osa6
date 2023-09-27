import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

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
    
    setAnecdotes(state, action) {
      return action.payload
    },

    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const { vote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const result = await anecdoteService.createNew(anecdote)
    dispatch(appendAnecdote(result))
  }
}

export default anecdoteSlice.reducer