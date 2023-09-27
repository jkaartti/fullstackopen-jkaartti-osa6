import { useSelector, useDispatch } from 'react-redux'

import { vote } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter(a => a.content.toUpperCase().includes(filter.toUpperCase()))
  })

  const dispatch = useDispatch()
  return (
    <div>
      {anecdotes          
        .sort((a, b) => ( b.votes - a.votes ))
        .map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleVote={() => {
              dispatch(vote(anecdote))
              dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
            }}
          />
        )
      }
    </div>
  )
}

export default AnecdoteList