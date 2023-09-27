import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  /*const anecdotes = [
    {
      "content": "If it hurts, do it more often",
      "id": "47145",
      "votes": 0
    },
  ]*/

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => {
      return axios.get('http://localhost:3001/anecdotes').then(res => res.data)
    },
    refetchOnWindowFocus: false,
    retry: 1
  })

  if (result.isLoading) {
    return <span>loading data...</span>
  }

  if (result.isError) {
    return <span>anecdote service not available due to problems in server</span>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
