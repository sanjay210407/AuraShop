# AuraShop

Full-stack starter e-commerce application with React frontend and Express backend.

## Project structure

```
AuraShop/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── app.js
│   │   └── server.js
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── services/
│   ├── .env.example
│   └── vercel.json
└── render.yaml
```

## Features

- Session-based auth: signup, login, logout, user session restore
- Product listing + detail API/UI
- Search and category filtering
- Cart APIs: add, remove, update quantity, total
- Checkout flow with order confirmation
- Context API global state (user + cart + wishlist + theme)
- Dark/light mode toggle
- Loading indicators and responsive UI
- Deployment-ready config for Vercel (frontend) and Render (backend)

## Run locally

### Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend defaults to `http://localhost:5173` and backend to `http://localhost:5000`.
