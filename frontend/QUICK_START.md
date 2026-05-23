# 🚀 Frontend Setup Guide - AI Support Assistant Pro

This guide will help you get the React frontend running in under 5 minutes.

## ✅ Prerequisites Checklist

- [ ] Node.js 16+ installed (`node --version`)
- [ ] Backend running on `http://127.0.0.1:8000`
- [ ] Can see API docs at `http://127.0.0.1:8000/docs`

## ⚡ 5-Minute Setup

### 1️⃣ Install Dependencies (1 min)

```bash
cd frontend
npm install
```

### 2️⃣ Configure Backend URL (30 sec)

The `.env` file is already created with default URL:
```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

If your backend runs elsewhere, edit `.env`:
```bash
# Change this to your backend URL
VITE_API_BASE_URL=http://192.168.1.100:8000
```

### 3️⃣ Start Development Server (30 sec)

```bash
npm run dev
```

Browser will open at `http://localhost:5173` automatically.

### 4️⃣ Test the App (2 min)

1. Type a support question: *"I can't reset my password"*
2. Click **Analyze** button
3. Wait for AI analysis
4. View results and tickets

✅ **Done!** The frontend is running.

---

## 📦 Available Commands

```bash
# Development (with hot reload)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Fix code formatting
npm run lint
```

---

## 🎯 Project Features at a Glance

| Feature | Location |
|---------|----------|
| Message Input | `src/components/MessageInput.jsx` |
| Analysis Display | `src/components/AnalysisResult.jsx` |
| Tickets List | `src/components/TicketsHistory.jsx` |
| API Client | `src/services/api.js` |
| Theme/Variables | `src/styles/variables.css` |

---

## 🔧 Configuration Options

### Option 1: Environment File
Edit `frontend/.env`:
```env
VITE_API_BASE_URL=http://your-backend-url:8000
```

### Option 2: UI Configuration
Click ⚙️ button in top-right to change backend URL at runtime.

### Option 3: Production Build
Create `frontend/.env.production`:
```env
VITE_API_BASE_URL=https://your-production-backend.com
```

---

## 🐛 Quick Troubleshooting

### "Cannot GET /"
- Ensure Vite dev server is running: `npm run dev`
- Check port 5173 is not in use

### "API Error / 503"
- Verify backend is running: `http://127.0.0.1:8000/docs`
- Check `.env` file has correct backend URL
- Ensure CORS is enabled on backend

### "Blank white page"
- Open browser DevTools (F12)
- Check Console tab for JavaScript errors
- Look for network requests failing

### "npm: command not found"
- Install Node.js from [nodejs.org](https://nodejs.org)
- Restart your terminal

---

## 📁 Quick File Reference

```
frontend/
├── src/
│   ├── App.jsx              ← Main component
│   ├── App.css              ← Global styles
│   ├── components/          ← React components
│   │   ├── MessageInput.jsx
│   │   ├── AnalysisResult.jsx
│   │   ├── TicketsHistory.jsx
│   │   └── LoadingSpinner.jsx
│   ├── services/
│   │   └── api.js          ← API calls
│   └── styles/
│       ├── variables.css    ← Theme colors
│       └── responsive.css   ← Mobile styles
├── .env                     ← Backend URL
├── package.json             ← Dependencies
└── vite.config.js          ← Vite config
```

---

## 🌐 API Endpoints Used

The frontend calls these backend endpoints:

```
POST   /support/analyze      (Analyze a message)
GET    /tickets              (Get all tickets)
GET    /ticket/{id}          (Get ticket details)
```

---

## 📱 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

---

## 🚀 Deployment Checklist

- [ ] Run `npm run build`
- [ ] Test with `npm run preview`
- [ ] Create `.env.production` with production backend URL
- [ ] Deploy `dist/` folder to hosting
- [ ] Test deployed frontend with backend

---

## 💡 Tips & Tricks

| Tip | How |
|-----|-----|
| **Quick refresh** | Ctrl+Shift+R (hard refresh) |
| **DevTools** | F12 to open developer tools |
| **Network tab** | See API requests: DevTools → Network |
| **Mobile test** | Chrome DevTools → Toggle device toolbar |
| **Production preview** | `npm run build && npm run preview` |

---

## ❓ Still Need Help?

Check the full [README.md](./README.md) in the frontend folder for detailed documentation.

---

**Ready? Type `npm run dev` and start building!** 🎉
