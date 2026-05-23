import { useState, useEffect } from 'react'
import MessageInput from './components/MessageInput'
import AnalysisResult from './components/AnalysisResult'
import TicketsHistory from './components/TicketsHistory'
import LoadingSpinner from './components/LoadingSpinner'
import { analyzeMessage, getAllTickets, API_BASE_URL } from './services/api'
import './styles/variables.css'
import './styles/responsive.css'
import './App.css'

function App() {
  const [analysis, setAnalysis] = useState(null)
  const [context, setContext] = useState(null)
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(false)
  const [ticketsLoading, setTicketsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [ticketsError, setTicketsError] = useState(null)
  const [apiUrl, setApiUrl] = useState(API_BASE_URL)
  const [showUrlConfig, setShowUrlConfig] = useState(false)
  const [tempUrl, setTempUrl] = useState(apiUrl)

  // Load tickets on mount
  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    try {
      setTicketsLoading(true)
      setTicketsError(null)
      const response = await getAllTickets()
      setTickets(response.tickets || [])
    } catch (err) {
      setTicketsError(err.message)
    } finally {
      setTicketsLoading(false)
    }
  }

  const handleAnalyze = async (message) => {
    try {
      setLoading(true)
      setError(null)
      setAnalysis(null)
      setContext(null)

      const response = await analyzeMessage(message)

      if (response.success) {
        setAnalysis(response.analysis)
        setContext(response.context_used)
        // Refresh tickets list
        fetchTickets()
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateUrl = () => {
    if (tempUrl.trim()) {
      setApiUrl(tempUrl)
      setShowUrlConfig(false)
    }
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="brand">
            <h1>🤖 AI Support Assistant Pro</h1>
            <p>Intelligent ticket analysis and support management</p>
          </div>
          <button
            className="btn-config"
            onClick={() => setShowUrlConfig(!showUrlConfig)}
            title="Configure backend URL"
          >
            ⚙️
          </button>
        </div>

        {/* URL Config */}
        {showUrlConfig && (
          <div className="url-config">
            <input
              type="text"
              value={tempUrl}
              onChange={(e) => setTempUrl(e.target.value)}
              placeholder="Backend URL"
              className="config-input"
            />
            <button
              onClick={handleUpdateUrl}
              className="btn btn-primary"
              style={{ minWidth: '100px' }}
            >
              Save
            </button>
            <p className="config-note">
              Current: <code>{apiUrl}</code>
            </p>
          </div>
        )}
      </header>

      {/* Main Container */}
      <main className="container">
        {/* Error Alert */}
        {error && (
          <div className="alert alert-error">
            <span>❌ {error}</span>
            <button onClick={() => setError(null)}>✕</button>
          </div>
        )}

        {/* Message Input */}
        <section className="section">
          <MessageInput
            onSubmit={handleAnalyze}
            isLoading={loading}
            placeholder="Describe your support issue or question here..."
          />
        </section>

        {/* Analysis Results */}
        {loading ? (
          <LoadingSpinner message="Analyzing your message..." />
        ) : (
          analysis && (
            <section className="section">
              <AnalysisResult analysis={analysis} context={context} />
            </section>
          )
        )}

        {/* Tickets History */}
        <section className="section">
          <TicketsHistory
            tickets={tickets}
            loading={ticketsLoading}
            error={ticketsError}
          />
          {!ticketsLoading && !ticketsError && tickets.length > 0 && (
            <button onClick={fetchTickets} className="btn btn-secondary">
              🔄 Refresh Tickets
            </button>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>AI Support Assistant Pro • Built with React + Vite</p>
      </footer>
    </div>
  )
}

export default App
