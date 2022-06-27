import { useState, useCallback } from 'react'
import './App.css'
import Chat from './chat'
import Bubble from './bubble'
import BubbleInput from './bubble-input'
import useMessages from './use-messages'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  const [messages, addMessage] = useMessages([])
  const [newMessage, setNewMessage] = useState('')

  const handleSubmit = useCallback(
    bubbleHeight => {
      if (newMessage.length > 0) {
        addMessage({
          id: +new Date(),
          text: newMessage,
          height: bubbleHeight
        })
        setNewMessage('')
      }
    },
    [newMessage, messages]
  )

  const lastMessage = messages[messages.length - 1]
  const dy = lastMessage ? lastMessage.height : 0

  return (
    <div className="App">
      <Chat>
        <AnimatePresence>
          {messages.map(m => (
            <Bubble key={m.id} id={m.id} dy={dy}>
              {m.text}
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
