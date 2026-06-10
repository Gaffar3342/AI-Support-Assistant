# AI Support Assistant Pro

A full-stack support ticket analysis application that uses AI to classify incoming customer messages, retrieve relevant knowledge-base context, and suggest professional responses.

## Features

- **Ticket Analysis** - Classifies category, priority, and sentiment
- **Suggested Replies** - Generates a professional response for each support request
- **RAG Context Retrieval** - Retrieves relevant information from an indexed PDF knowledge base
- **Ticket Persistence** - Stores analyzed tickets in SQLite
- **REST API** - Provides FastAPI endpoints with interactive Swagger documentation
- **Responsive Interface** - Includes a React and Vite frontend for submitting and reviewing tickets

## Architecture

```text
React Frontend
      |
      v
FastAPI REST API
      |
      +--> OpenAI analysis and reply generation
      +--> ChromaDB knowledge-base retrieval
      +--> SQLite ticket storage
```

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| Backend | Python, FastAPI, Pydantic, Uvicorn |
| AI | OpenAI Responses API, OpenAI embeddings |
| Retrieval | ChromaDB, pypdf |
| Database | SQLite |
| Frontend | React 18, Vite, Axios, CSS |

## Project Structure

```text
AI-Support-Assistant/
├── main.py                  # FastAPI application and endpoints
├── config.py                # Environment-based configuration
├── database/                # SQLite connection and schema setup
├── knowledge_base/          # Source PDF for support knowledge
├── models/                  # Pydantic request and response models
├── services/                # AI, retrieval, and ticket services
├── utils/                   # Logging utilities
├── frontend/                # React and Vite client
└── requirements.txt         # Python dependencies
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Check API status |
| `POST` | `/knowledge/index` | Extract, embed, and index the knowledge-base PDF |
| `POST` | `/support/analyze` | Analyze a customer message and save the ticket |
| `GET` | `/tickets` | List analyzed tickets |
| `GET` | `/ticket/{ticket_id}` | Retrieve a ticket by ID |

## Local Setup

### Prerequisites

- Python 3.10+
- Node.js 18+
- An OpenAI API key

### 1. Backend

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Configure the backend environment:

```env
OPEN_AI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4.1-mini
EMBEDDING_MODEL=text-embedding-3-small
DB_NAME=support.db
CHROMA_PATH=./vector_store/chroma_db
```

Start the API:

```bash
uvicorn main:app --reload
```

The backend is available at `http://127.0.0.1:8000`, with Swagger documentation at `http://127.0.0.1:8000/docs`.

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The frontend is available at `http://localhost:5173`.

## Example Request

```bash
curl -X POST "http://127.0.0.1:8000/support/analyze" \
  -H "Content-Type: application/json" \
  -d '{"message":"I was charged twice for my subscription."}'
```

Example response shape:

```json
{
  "success": true,
  "context_used": "Relevant knowledge-base content",
  "analysis": {
    "category": "billing",
    "priorty": "high",
    "sentiment": "negative",
    "reply": "A professional suggested response"
  }
}
```

> The API currently uses the field name `priorty` for compatibility with the existing database and frontend contract.

## RAG Workflow

1. Extract text from the support knowledge-base PDF.
2. Split the content into overlapping chunks.
3. Generate embeddings and store them in ChromaDB.
4. Embed each incoming support message.
5. Retrieve the most relevant knowledge-base chunks.
6. Ask the AI model to classify the request and draft a grounded reply.
7. Save the completed analysis to SQLite.

## Portfolio Scope

This project demonstrates an end-to-end AI workflow: document ingestion, vector retrieval, structured LLM output, database persistence, REST API design, and frontend integration.

## License

This project was developed as a portfolio project.
