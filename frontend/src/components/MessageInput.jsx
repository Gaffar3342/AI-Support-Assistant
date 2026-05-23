import React, { useState } from 'react'
import './MessageInput.css'

export default function MessageInput({ onSubmit, isLoading, placeholder = 'Describe your issue or question...' }) {
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim() && !isLoading) {
      onSubmit(message)
      setMessage('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="message-input-form">
      <div className="textarea-container">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isLoading}
          className="message-textarea"
          rows="4"
        />
        <span className="char-count">
          {message.length} / 1000
        </span>
      </div>

      <div className="input-actions">
        <button
          type="submit"
          disabled={!message.trim() || isLoading}
          className="btn btn-primary"
        >
          {isLoading ? (
            <>
              <span className="spinner-mini"></span>
              Analyzing...
            </>
          ) : (
            'Analyze'
          )}
        </button>
        <p className="hint">💡 Tip: Press Ctrl+Enter to submit</p>
      </div>
    </form>
  )
}
