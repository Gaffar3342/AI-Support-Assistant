import React, { useState } from 'react'
import './AnalysisResult.css'

const BadgeColor = {
  shipping: 'badge-blue',
  billing: 'badge-purple',
  technical: 'badge-orange',
  general: 'badge-gray',
  positive: 'badge-success',
  negative: 'badge-danger',
  neutral: 'badge-warning',
  low: 'badge-gray',
  medium: 'badge-warning',
  high: 'badge-danger',
}

function ResultCard({ icon, title, value, badgeColor = 'badge-blue' }) {
  return (
    <div className="result-card">
      <div className="card-header">
        <span className="card-icon">{icon}</span>
        <h4>{title}</h4>
      </div>
      <span className={`badge ${badgeColor}`}>{value}</span>
    </div>
  )
}

export default function AnalysisResult({ analysis, context }) {
  const [showContext, setShowContext] = useState(false)

  if (!analysis) return null

  return (
    <div className="analysis-result">
      <h3 className="section-title">📊 Analysis Results</h3>

      {/* Result Cards Grid */}
      <div className="results-grid">
        <ResultCard
          icon="📁"
          title="Category"
          value={analysis.category}
          badgeColor={BadgeColor[analysis.category]}
        />
        <ResultCard
          icon="⚡"
          title="Priority"
          value={analysis.priorty}
          badgeColor={BadgeColor[analysis.priorty]}
        />
        <ResultCard
          icon="😊"
          title="Sentiment"
          value={analysis.sentiment}
          badgeColor={BadgeColor[analysis.sentiment]}
        />
      </div>

      {/* AI Reply Card */}
      <div className="ai-reply-card">
        <h4 className="card-title">🤖 AI Reply</h4>
        <p>{analysis.reply}</p>
      </div>

      {/* Context Card - On Demand */}
      {context && (
        <div className={`context-card ${showContext ? 'expanded' : ''}`}>
          <button
            className="context-toggle-btn"
            onClick={() => setShowContext(!showContext)}
          >
            <span className="toggle-icon">{showContext ? '▼' : '▶'}</span>
            <h4 className="card-title">📚 Retrieved Context</h4>
          </button>

          {showContext && (
            <div className="context-content">
              {context ? (
                <p>{context}</p>
              ) : (
                <p className="text-secondary">No relevant context found</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
