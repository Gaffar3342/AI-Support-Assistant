# AI Support Assistant Pro - Frontend

A modern, responsive React + Vite frontend dashboard for the AI Support Assistant Pro backend. Built with a focus on clean architecture, performance, and user experience.

## 🎯 Features

- **Message Analysis**: Input support tickets and get AI-powered analysis
- **Real-time Results**: View categorization, priority, and sentiment analysis
- **AI Responses**: Get intelligent replies powered by OpenAI
- **Context Retrieval**: See relevant knowledge base context used for analysis
- **Ticket History**: Browse and expand previous support tickets
- **Configurable Backend**: Easy-to-use URL configuration
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark Theme**: Eye-friendly modern UI with gradient accents
- **Loading States**: Clear feedback during API calls

## 📦 Tech Stack

- **React 18** - UI framework
- **Vite 5** - Lightning-fast build tool
- **Axios** - HTTP client for API calls
- **CSS3** - Modern styling with variables and animations

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ (recommended: 18 or 20)
- npm or yarn
- Backend running on `http://127.0.0.1:8000` (or configure custom URL)

### Installation

1. **Navigate to frontend folder**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

4. **Configure backend URL (optional)**
   Edit `.env` file:
   ```env
   VITE_API_BASE_URL=http://127.0.0.1:8000
   ```

### Development

Start the development server with hot reload:

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### Production Build

Build for production:

```bash
npm run build
```

Output files will be in the `dist/` folder.

Preview the production build:

```bash
npm run preview
```

## 📁 Project Structure

```
frontend/
├── index.html                 # Entry HTML file
├── package.json              # Dependencies
├── vite.config.js           # Vite configuration
├── .env.example             # Environment template
├── .gitignore               # Git ignore rules
├── public/                  # Static assets
└── src/
    ├── main.jsx             # React entry point
    ├── App.jsx              # Main app component
    ├── App.css              # Global styles
    ├── components/          # Reusable components
    │   ├── MessageInput.jsx
    │   ├── MessageInput.css
    │   ├── AnalysisResult.jsx
    │   ├── AnalysisResult.css
    │   ├── TicketsHistory.jsx
    │   ├── TicketsHistory.css
    │   ├── LoadingSpinner.jsx
    │   └── LoadingSpinner.css
    ├── services/            # API services
    │   └── api.js          # Axios API client
    └── styles/             # Global styles
        ├── variables.css   # CSS variables and theme
        └── responsive.css  # Media queries
```

## 🎨 Design System

### Color Palette

- **Primary**: `#6366f1` (Indigo)
- **Secondary**: `#ec4899` (Pink)
- **Success**: `#10b981` (Emerald)
- **Warning**: `#f59e0b` (Amber)
- **Danger**: `#ef4444` (Red)
- **Background**: `#0f172a` (Dark Slate)
- **Surface**: `#1e293b` (Slate)

### Spacing System

- XS: 0.5rem
- SM: 0.75rem
- MD: 1rem
- LG: 1.5rem
- XL: 2rem
- 2XL: 3rem (4rem on large screens)

### Breakpoints

- Mobile: < 480px
- Tablet: 480px - 768px
- Desktop: 768px - 1280px
- Large: > 1280px

## 🔧 Configuration

### Backend URL

**Option 1: Environment Variable**
```env
VITE_API_BASE_URL=http://your-backend-url:8000
```

**Option 2: UI Configuration**
Click the ⚙️ button in the header to change the backend URL at runtime.

### CORS Configuration

If you get CORS errors, ensure your backend (FastAPI) has CORS enabled:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or specify frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 📝 Component Documentation

### MessageInput
- **Props**: `onSubmit`, `isLoading`, `placeholder`
- **Features**: Textarea with character count, submit button, keyboard shortcut (Ctrl+Enter)

### AnalysisResult
- **Props**: `analysis`, `context`
- **Features**: Display category/priority/sentiment badges, AI reply card, retrieved context

### TicketsHistory
- **Props**: `tickets`, `loading`, `error`
- **Features**: Expandable ticket list, status badges, full ticket details on expand

### LoadingSpinner
- **Props**: `message`
- **Features**: Animated spinner with custom message

## 🌐 API Integration

All API calls are handled in `src/services/api.js`:

- `analyzeMessage(message)` - POST /support/analyze
- `getAllTickets()` - GET /tickets
- `getTicketById(ticketId)` - GET /ticket/{ticketId}
- `indexKnowledgeBase()` - POST /knowledge/index

## ♿ Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- ARIA labels where appropriate
- Keyboard navigation support
- High contrast color scheme
- Focus states for interactive elements

## 📱 Responsive Design

The app is fully responsive:
- **Mobile**: Stacked layout, touch-friendly buttons
- **Tablet**: Optimized grid layout
- **Desktop**: Multi-column layout with sidebar potential
- **Large Screens**: Enhanced spacing and typography

## 🐛 Troubleshooting

### Blank Page
- Check browser console for errors
- Ensure backend is running
- Verify `VITE_API_BASE_URL` environment variable

### API Connection Error
- Confirm backend URL is correct
- Ensure CORS is enabled on backend
- Check browser Network tab for failed requests

### Slow Performance
- Run `npm run build` for production
- Use `npm run preview` to test production build
- Check for console warnings

## 📦 Deployment

### Vercel (Recommended)
```bash
npm run build
# Upload dist/ folder to Vercel
```

### Netlify
```bash
npm run build
# Connect your Git repo to Netlify
```

### Self-Hosted
```bash
npm run build
# Serve the dist/ folder with any static server
```

Example with Python:
```bash
python -m http.server 8080 --directory dist
```

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Axios Documentation](https://axios-http.com)
- [CSS Grid & Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout)

## 📄 License

This project is part of the AI Support Assistant Pro portfolio project.

## 💡 Tips for Beginners

1. **Component Structure**: Each component is independent and self-contained
2. **Styling**: CSS is organized with variables for easy theming
3. **API Calls**: All API logic is in one place (`services/api.js`)
4. **State Management**: Simple React hooks (useState, useEffect)
5. **Responsive**: Use browser DevTools to test different screen sizes

## 🚀 Next Steps

- Add toast notifications for better UX
- Implement real-time updates with WebSockets
- Add data export functionality
- Create dashboard analytics
- Add user authentication
- Implement advanced filtering and search

---

**Built with ❤️ for the AI Support Assistant Pro Project**
