import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },

    appendAnecdote(state, action) {
      state.push(action.payload)
    },

    updateAnecdote(state, action) {
      const id = action.payload.id
      return state.map(a => a.id !== id ? a : action.payload)
    }
  }
})

export const { setAnecdotes, appendAnecdote, updateAnecdote } = anecdoteSlice.actions

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

export const vote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    const result = await anecdoteService.update(anecdote.id, newAnecdote)
    dispatch(updateAnecdote(result))
  }
}

export default anecdoteSlice.reducer