<div align="center">

# 🚀 NexTask

**A real-time, full-stack project & task management platform**

[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.x-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com)

*Built as a personal full-stack project to master modern web architecture — real-time sync, secure auth, clean API design.*

<br/>

| | |
|:---:|:---:|
| ![Landing Page](docs/screenshots/01-landing.png) | ![Dashboard Overview](docs/screenshots/02-dashboard.png) |
| **Landing Page** — Hero section & navigation | **Dashboard** — Stats cards, recent tasks & calendar |
| ![Kanban Board](docs/screenshots/03-kanban.png) | ![Task Comments](docs/screenshots/04-comments.png) |
| **Kanban Board** — Drag & drop across columns | **Task Detail** — Real-time comment sidebar |

</div>

---

## ✨ What is NexTask?

NexTask is a **full-stack task management application** inspired by tools like Linear and Trello. It lets teams create projects, manage tasks on a Kanban board, collaborate in real-time, and stay updated via a live notification system — all powered by a production-grade Node.js API.

The goal of building this project was to go beyond tutorials and build something with **real architectural decisions**: monorepo structure, event-driven real-time updates, social OAuth, drag-and-drop with fractional positioning, and clean separation of concerns.

---

## 🎯 Core Features

### 🔐 Authentication & Security
- **JWT-based auth** with access/refresh token flow
- **Social OAuth** via Google & GitHub (Passport.js strategies)
- **Forgot password** email flow using Nodemailer
- Password hashing with **bcrypt**; HTTP headers secured by **Helmet.js**
- **Rate limiting** middleware to prevent abuse

### 📋 Projects & Tasks
- Create and manage multiple **projects** with owner/member roles
- **Kanban board** with columns: `TODO` → `IN PROGRESS` → `DONE`
- **Drag & drop** task reordering using a **LexoRank-inspired fractional positioning** algorithm
- Task detail sidebar with description, priority, due date, and member assignment
- File **attachments** per task (upload and serve static files)

### ⚡ Real-Time Collaboration (Socket.IO)
- Tasks created/updated/deleted **broadcast instantly** to all project members
- **Comment counts** update live without polling
- Users join project-specific Socket.IO rooms on connect
- Optimistic UI updates with server reconciliation on failure

### 💬 Comments & Notifications
- Per-task **comment threads** with real-time sync
- In-app **notification system** with read/unread states
- Comment count badges update live across all connected clients

### 👤 User & Team Management
- **Profile management** with avatar upload
- Project owner can **invite members** by email
- Member avatars displayed in project header (stack with overflow indicator)
- Role-based UI: only project **owners** can create/delete tasks

### 📊 Analytics Dashboard
- Visual overview of task distribution by status
- Project-level progress tracking

---

## 🏗️ Architecture

NexTask is organized as a **pnpm monorepo** with two packages: `backend` and `frontend`.

```
NexTask_API/
├── backend/                  # Node.js + Express API
│   ├── src/
│   │   ├── modules/          # Feature-based modules
│   │   │   ├── auth/         # JWT, OAuth, password reset
│   │   │   ├── projects/     # Project CRUD & membership
│   │   │   ├── tasks/        # Tasks, drag-drop reorder
│   │   │   ├── comments/     # Threaded comments
│   │   │   ├── notifications/# Real-time notification feed
│   │   │   ├── attachments/  # File upload per task
│   │   │   └── users/        # Profile management
│   │   ├── lib/              # Prisma client, Passport, Socket.IO init
│   │   ├── middlewares/      # Auth guard, error handler, rate limiter
│   │   └── utils/            # Helpers, validators
│   └── prisma/               # Schema & migrations (PostgreSQL)
│
├── frontend/                 # React + Vite SPA
│   └── src/
│       ├── pages/            # Dashboard, Tasks, Analytics, Auth, Profile
│       ├── components/       # Kanban board, Task sidebar, Forms, Layout
│       ├── contexts/         # AuthContext, ProjectContext, SocketContext
│       └── services/         # Axios API wrappers
│
├── docker-compose.yml        # PostgreSQL container
└── pnpm-workspace.yaml
```

### Data Flow (Real-Time)

```
Client Action (drag task)
    │
    ▼
REST API (PATCH /api/v1/tasks/:id)
    │
    ▼
Database Update (Prisma → PostgreSQL)
    │
    ▼
Socket.IO Emit ("task:updated" → project room)
    │
    ▼
All connected clients update UI instantly
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Runtime** | Node.js 20+ | Async I/O server runtime |
| **Language** | TypeScript (strict) | Type safety throughout |
| **Framework** | Express.js | REST API routing |
| **ORM** | Prisma | Type-safe DB access + migrations |
| **Database** | PostgreSQL 15 | Relational data, ACID transactions |
| **Real-Time** | Socket.IO 4 | Bi-directional WebSocket events |
| **Auth** | JWT + Passport.js | Stateless auth, Google/GitHub OAuth |
| **Security** | Helmet, bcrypt, rate-limit | Headers, hashing, abuse prevention |
| **Email** | Nodemailer | Transactional password reset emails |
| **Validation** | Zod | Request schema validation |
| **Testing** | Jest + Supertest | Unit & integration tests |
| **Logging** | Winston + Morgan | Structured logs + HTTP request logs |
| **Frontend** | React 18 + Vite | Fast SPA with HMR |
| **Drag & Drop** | react-beautiful-dnd | Kanban board interaction |
| **Infra** | Docker Compose | Local PostgreSQL container |
| **Monorepo** | pnpm Workspaces | Shared tooling, linked packages |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) v20+
- [pnpm](https://pnpm.io) v8+
- [Docker](https://docker.com) (for PostgreSQL)

### 1. Clone & Install

```bash
git clone https://github.com/your-username/nextask.git
cd nextask
pnpm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Fill in your `.env`:

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/nextask"
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=nextask

# JWT
JWT_SECRET=your_super_secret_key
JWT_REFRESH_SECRET=your_refresh_secret

# Google OAuth
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# GitHub OAuth
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...

# Email (for password reset)
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=...
EMAIL_PASS=...
```

### 3. Start Database

```bash
docker compose up db -d
```

### 4. Run Migrations

```bash
pnpm --filter backend exec prisma migrate dev
```

### 5. Start Development Servers

```bash
# Terminal 1 – Backend API (port 5000)
pnpm --filter backend dev

# Terminal 2 – Frontend (port 5173)
pnpm --filter frontend dev
```

Open [http://localhost:5173](http://localhost:5173) 🎉

---

## 🧪 Running Tests

```bash
# Backend unit & integration tests
pnpm --filter backend test
```

Tests are written with **Jest** and **Supertest**, following the AAA pattern (Arrange, Act, Assert). Test files live beside the modules they cover:

```
backend/src/modules/auth/
├── auth.service.ts
├── auth.routes.ts
└── auth.integration.test.ts   ← tests here
```

---

## 📡 API Reference

All endpoints are prefixed with `/api/v1`.

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/auth/register` | ❌ | Register new user |
| `POST` | `/auth/login` | ❌ | Login, receive JWT |
| `POST` | `/auth/refresh` | ❌ | Refresh access token |
| `POST` | `/auth/forgot-password` | ❌ | Send reset email |
| `GET` | `/auth/google` | ❌ | Google OAuth redirect |
| `GET` | `/auth/github` | ❌ | GitHub OAuth redirect |
| `GET` | `/projects` | ✅ | List user's projects |
| `POST` | `/projects` | ✅ | Create project |
| `POST` | `/projects/:id/members` | ✅ | Invite member |
| `GET` | `/tasks?projectId=` | ✅ | Get tasks for project |
| `POST` | `/tasks` | ✅ | Create task |
| `PATCH` | `/tasks/:id` | ✅ | Update task (incl. drag) |
| `DELETE` | `/tasks/:id` | ✅ | Delete task |
| `GET` | `/comments?taskId=` | ✅ | Get task comments |
| `POST` | `/comments` | ✅ | Add comment |
| `GET` | `/notifications` | ✅ | Get user notifications |
| `PATCH` | `/notifications/:id/read` | ✅ | Mark as read |
| `POST` | `/tasks/:id/attachments` | ✅ | Upload file |
| `GET` | `/users/me` | ✅ | Get profile |
| `PATCH` | `/users/me` | ✅ | Update profile + avatar |

---

## ⚙️ Socket.IO Events

| Event | Direction | Payload | Description |
|-------|-----------|---------|-------------|
| `join:project` | Client → Server | `projectId` | Join a project room |
| `task:created` | Server → Client | `{ task }` | New task broadcast |
| `task:updated` | Server → Client | `{ updatedTask }` | Task change broadcast |
| `task:deleted` | Server → Client | `{ taskId }` | Task removal broadcast |
| `comment:new` | Server → Client | `{ taskId, comment }` | New comment broadcast |
| `comment:deleted` | Server → Client | `{ taskId, commentId }` | Comment removed |
| `task:comment_count_updated` | Server → Client | `{ taskId, increment }` | Badge count sync |

---

## 🔑 Key Engineering Decisions

**Fractional Positioning for Drag & Drop**
Instead of integer indexes (which require re-numbering all siblings on reorder), tasks store a float `position` value. When a task is dropped between two others, its new position is the midpoint of its neighbors — zero database writes for unaffected tasks.

**Socket.IO Room Architecture**
Each project has its own room (`join:project <projectId>`). Real-time events are scoped to the room, so users only receive updates for projects they belong to. This scales horizontally and avoids broadcasting noise.

**Optimistic UI Updates**
On drag-end, the UI updates immediately before the API call resolves. If the server returns an error, the task list is refetched to restore truth. This makes the app feel instant without sacrificing consistency.

**Feature-Module Structure**
Each domain (auth, tasks, projects, …) owns its own `controller`, `service`, `routes`, and `dto` files. Business logic stays in services, HTTP concerns stay in controllers — making testing and refactoring straightforward.

---

## 🗺️ Roadmap

- [ ] Redis integration for session caching & rate limit storage
- [ ] Task filtering & sorting (assignee, priority, due date)
- [ ] Subtasks / checklists
- [ ] Email notification digests
- [ ] CI/CD pipeline with GitHub Actions
- [ ] Deploy to Railway / Render

---

## 👨‍💻 Author

**Vinh Nguyen**
- GitHub: [@Vinhn1](https://github.com/Vinhn1)
- Built with ☕ and late nights as a self-driven learning project.

---

<div align="center">

*If this project helped you learn something, leave a ⭐ — it means a lot!*

</div>
