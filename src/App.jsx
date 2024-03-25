import { React,useState } from 'react'
import './App.css'
import Homepage from './pages/homepage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='App'>
        <Homepage />
      </div>
    </>
  )
}

export default App
