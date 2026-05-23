# AI Support Assistant Pro - Full Stack

A complete AI-powered support ticket management system with FastAPI backend and React frontend.

## 📦 Project Structure

```
AI_Support_Assistant/
├── backend/                    # FastAPI backend (Python)
│   ├── main.py                # Entry point
│   ├── config.py              # Configuration
│   ├── requirements.txt        # Python dependencies
│   ├── database/
│   ├── models/
│   ├── services/
│   ├── utils/
│   ├── vector_store/
│   └── knowledge_base/
│
├── frontend/                   # React + Vite frontend
│   ├── src/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── README.md              # Frontend setup guide
│
└── README.md                   # This file
```

## 🚀 Quick Start

### Step 1: Start Backend

```bash
# Navigate to project root
cd AI_Support_Assistant

# Activate virtual environment (if not already active)
source venv/bin/activate

# Run FastAPI server
uvicorn main:app --reload
```

Backend will be available at: `http://127.0.0.1:8000`

### Step 2: Start Frontend

```bash
# Open a new terminal, navigate to frontend
cd AI_Support_Assistant/frontend

# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

Frontend will be available at: `http://localhost:5173`

## 🔗 Backend API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/support/analyze` | Analyze a support message |
| `GET` | `/tickets` | Get all tickets |
| `GET` | `/ticket/{ticket_id}` | Get specific ticket |
| `POST` | `/knowledge/index` | Index knowledge base |

### Example Request

```bash
curl -X POST "http://127.0.0.1:8000/support/analyze" \
  -H "Content-Type: application/json" \
  -d '{"message": "I cannot login to my account"}'
```

## 📋 Backend Requirements

Python 3.10+

See `requirements.txt` for complete list. Key packages:
- FastAPI
- Uvicorn
- OpenAI
- ChromaDB
- Pydantic
- SQLite3

## 🎨 Frontend Tech Stack

- React 18
- Vite 5
- Axios
- CSS3 with custom properties

## 🔧 Configuration

### Backend Configuration
Edit `config.py`:
```python
OPEN_AI_API_KEY=your_key_here
OPENAI_MODEL=gpt-4-turbo-mini
```

### Frontend Configuration
Edit `frontend/.env`:
```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

## 📱 Features

### Backend
- ✅ AI-powered ticket analysis
- ✅ Category, priority, and sentiment classification
- ✅ RAG-based context retrieval from knowledge base
- ✅ SQLite database for ticket storage
- ✅ Vector embeddings with ChromaDB
- ✅ RESTful API with FastAPI

### Frontend
- ✅ Clean, modern UI
- ✅ Real-time analysis results
- ✅ Ticket history with expandable details
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Configurable backend URL
- ✅ Loading states and error handling
- ✅ Dark theme with gradient accents

## 🌐 Production Deployment

### Backend Deployment (Heroku Example)

```bash
# Create Procfile
echo "web: uvicorn main:app --host 0.0.0.0 --port $PORT" > Procfile

# Deploy to Heroku
git push heroku main
```

### Frontend Deployment (Vercel Example)

```bash
cd frontend
npm run build
# Connect your Git repo to Vercel Dashboard
```

Update backend URL in `frontend/.env.production`:
```env
VITE_API_BASE_URL=https://your-backend-url.com
```

## 🛠️ Development Workflow

### Backend Development

```bash
# Terminal 1
source venv/bin/activate
uvicorn main:app --reload
```

### Frontend Development

```bash
# Terminal 2
cd frontend
npm run dev
```

### Making Changes

1. Backend: Modify Python files → Auto-reload with Uvicorn `--reload`
2. Frontend: Modify React files → Hot reload with Vite

## 📝 Documentation

- **Backend**: See individual module docstrings
- **Frontend**: See [frontend/README.md](frontend/README.md)
- **API**: Visit `http://127.0.0.1:8000/docs` (Swagger UI)

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 8000
lsof -i :8000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Or use different port
uvicorn main:app --port 8001
```

### CORS Errors

Ensure backend has CORS middleware enabled in `main.py`.

### API Not Responding

1. Check backend is running: `http://127.0.0.1:8000/docs`
2. Verify frontend `.env` has correct URL
3. Check browser Network tab for request details

## 📚 Learning Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [SQLite](https://www.sqlite.org)
- [ChromaDB](https://www.trychroma.com)

## 🎯 Next Steps

- [ ] Add user authentication
- [ ] Implement real-time notifications
- [ ] Add dashboard analytics
- [ ] Create admin panel
- [ ] Setup CI/CD pipeline
- [ ] Add unit tests
- [ ] Implement caching strategy
- [ ] Add export functionality

## 📄 License

Portfolio Project

## 👨‍💻 Author

Gafaryormaz

---

**Built with ❤️ as a portfolio project showcasing full-stack AI development**
