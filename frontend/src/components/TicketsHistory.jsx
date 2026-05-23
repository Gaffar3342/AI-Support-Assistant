import React, { useState } from 'react'
import './TicketsHistory.css'

const StatusBadgeColor = {
  open: 'status-open',
  closed: 'status-closed',
  pending: 'status-pending',
}

export default function TicketsHistory({ tickets, loading, error }) {
  const [expandedId, setExpandedId] = useState(null)

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  if (loading) {
    return (
      <div className="tickets-section">
        <h3 className="section-title">🎫 Tickets History</h3>
        <div className="loading-state">Loading tickets...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="tickets-section">
        <h3 className="section-title">🎫 Tickets History</h3>
        <div className="error-state">
          <p>⚠️ {error}</p>
        </div>
      </div>
    )
  }

  if (!tickets || tickets.length === 0) {
    return (
      <div className="tickets-section">
        <h3 className="section-title">🎫 Tickets History</h3>
        <div className="empty-state">
          <p>No tickets yet. Submit your first support request!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="tickets-section">
      <h3 className="section-title">🎫 Tickets History</h3>
      <div className="tickets-list">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className={`ticket-item ${expandedId === ticket.id ? 'expanded' : ''}`}
          >
            <div
              className="ticket-header"
              onClick={() => toggleExpand(ticket.id)}
            >
              <div className="ticket-info">
                <div className="ticket-id">#{ticket.id}</div>
                <div className="ticket-preview">{ticket.user_message.substring(0, 60)}...</div>
              </div>
              <div className="ticket-meta">
                <span className={`status-badge ${StatusBadgeColor[ticket.status]}`}>
                  {ticket.status}
                </span>
                <span className="expand-icon">{expandedId === ticket.id ? '▼' : '▶'}</span>
              </div>
            </div>

            {expandedId === ticket.id && (
              <div className="ticket-details">
                <div className="detail-row">
                  <label>Message:</label>
                  <p>{ticket.user_message}</p>
                </div>

                <div className="details-grid">
                  <div className="detail-item">
                    <label>Category</label>
                    <span className="detail-badge">{ticket.category}</span>
                  </div>
                  <div className="detail-item">
                    <label>Priority</label>
                    <span className="detail-badge">{ticket.priorty}</span>
                  </div>
                  <div className="detail-item">
                    <label>Sentiment</label>
                    <span className="detail-badge">{ticket.sentiment}</span>
                  </div>
                  <div className="detail-item">
                    <label>Created</label>
                    <span className="detail-badge">
                      {new Date(ticket.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="detail-row">
                  <label>AI Response:</label>
                  <p>{ticket.ai_reply}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="tickets-count">
        Total: <strong>{tickets.length}</strong> ticket{tickets.length !== 1 ? 's' : ''}
      </div>
    </div>
  )
}
