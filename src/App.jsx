import { useState, useCallback } from 'react'
import logo from './logo.svg'
import './App.css'
import Chat from './chat'
import Bubble from './bubble'
import BubbleInput from './bubble-input'
import useMessages from './use-messages'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  const [messages, addMessage] = useMessages([])
  const [newMessage, setNewMessage] = useState('')

  const handleSubmit = useCallback(() => {
    if (newMessage.length > 0) {
      addMessage(newMessage)
      setNewMessage('')
    }
  }, [newMessage, messages])

  return (
    <div className="App">
      <Chat>
        <AnimatePresence>
          {messages.map(m => (
            <Bubble key={m} id={m}>
              {m}
            </Bubble>
          ))}
        </AnimatePresence>
        <BubbleInput
          value={newMessage}
          onChange={setNewMessage}
          onSubmit={handleSubmit}
        />
      </Chat>
    </div>
  )
}

export default App
