# Project Hub Backend

## Features
- Node.js + Express + MongoDB (Mongoose)
- User authentication (JWT, cookies)
- User CRUD (register, login, list, delete)
- Project CRUD (create, read, update, delete)
- Ready for React Query and cookie-based auth

## Getting Started

1. Install dependencies:
   ```sh
   npm install
   ```
2. Set up MongoDB (local or Atlas) and update `.env` if needed.
3. Start the server:
   ```sh
   npm run dev
   ```

API endpoints:
- `POST /api/users/register` — Register user
- `POST /api/users/login` — Login user (sets cookie)
- `POST /api/users/logout` — Logout (clears cookie)
- `GET /api/users/me` — Get current user
- `GET /api/projects` — List projects
- `POST /api/projects` — Create project (auth)
- `PUT /api/projects/:id` — Update project (auth)
- `DELETE /api/projects/:id` — Delete project (auth)
