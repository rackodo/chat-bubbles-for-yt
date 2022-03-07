import { useState, useCallback } from 'react'

const useMessages = (initialValue = []) => {
  const [messages, setMessages] = useState(initialValue)

  const addMessage = useCallback(
    msg => {
      const i = messages.length
      setMessages([...messages, msg])
      setTimeout(() => {
        setMessages(current => {
          const n = [...current]
          n.shift()
          return n
        })
      }, 15000)
    },
    [messages]
  )

  return [messages, addMessage]
}

export default useMessages
