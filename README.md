# Basic MERN CRUD App — Student Management

A simple MERN stack app to create, view, edit, and delete student records. It has **no authentication or authorization**.

## Requirements
- Node.js and npm
- MongoDB running locally, or a MongoDB Atlas connection string

## 1. Configure and start the backend

Open a terminal:

```bash
cd backend
npm install
```

Copy `.env.example` to `.env` and check the MongoDB URI:
- Windows Command Prompt: `copy .env.example .env`
- macOS/Linux: `cp .env.example .env`

Default local URI:
```env
MONGO_URI=mongodb://127.0.0.1:27017/studentDB
PORT=5000
```

Make sure your local MongoDB server is running, then start the API:

```bash
npm start
```

The API runs at `http://localhost:5000`.

## 2. Start the frontend

Open a **second terminal** from the project root:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## CRUD routes
- `POST /api/students` — create a student
- `GET /api/students` — get all students
- `GET /api/students/:id` — get one student
- `PUT /api/students/:id` — update a student
- `DELETE /api/students/:id` — delete a student

Student fields: `name`, `email`, `course`.

## Notes
- Backend `.env` is ignored by Git; do not commit database credentials.
- If using MongoDB Atlas, replace `MONGO_URI` in `backend/.env` with your Atlas connection string.
- Frontend API URL defaults to `http://localhost:5000/api/students`. To change it, copy `frontend/.env.example` to `frontend/.env` and edit `VITE_API_URL`; restart Vite after changing it.
- This starter uses plain CSS rather than Chakra UI so the app works without extra UI setup. You can add Chakra UI later if your class requires it.
