import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const analyzeMessage = async (message) => {
  try {
    const response = await api.post('/support/analyze', { message })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.detail || 'Failed to analyze message')
  }
}

export const getAllTickets = async () => {
  try {
    const response = await api.get('/tickets')
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.detail || 'Failed to fetch tickets')
  }
}

export const getTicketById = async (ticketId) => {
  try {
    const response = await api.get(`/ticket/${ticketId}`)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.detail || 'Failed to fetch ticket')
  }
}

export const indexKnowledgeBase = async () => {
  try {
    const response = await api.post('/knowledge/index')
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.detail || 'Failed to index knowledge base')
  }
}

export { API_BASE_URL }
