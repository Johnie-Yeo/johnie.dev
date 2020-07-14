import React from "react"

interface SpeechBubbleProps {
  message: string
}

const SpeechBubble = ({ message }: SpeechBubbleProps) => {
  return <div>{message}</div>
}

export default SpeechBubble
