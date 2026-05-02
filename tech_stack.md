# 🚀 NexTask API - Professional Backend Tech Stack

> **⚠️ WARNING:** This project implementation is currently **BLOCKED**. 
> The mentor is waiting for the developer to answer foundational architectural questions before proceeding with the implementation.

## 🏗️ Core Technologies

### 1. Runtime & Language
- **Node.js (v20+):** Industry-standard asynchronous event-driven JavaScript runtime.
- **TypeScript:** Adds static typing to JavaScript. Mandatory for professional projects to reduce runtime errors and improve developer experience.

### 2. Framework & API
- **Express.js:** Minimalist web framework for Node.js. 
- **Zod / Joi:** For robust request body and schema validation.

### 3. Data Management
- **PostgreSQL:** A powerful, open-source object-relational database system. Chosen over NoSQL to master ACID properties, Transactions, and Complex Joins.
- **Prisma ORM:** Modern database toolkit for TypeScript. Provides type-safe database access and automated migrations.

### 4. Architecture
- **Monorepo:** A unified repository structure containing multiple projects (backend, frontend).
- **pnpm Workspaces:** To manage dependencies across the monorepo efficiently, allowing for local package linking and shared code.

### 5. Infrastructure & DevOps
- **Docker:** Containerization platform to ensure "it works on my machine" everywhere.
- **Docker Compose:** To orchestrate multi-container applications (Node.js + Postgres + Redis).

### 6. Security & Authentication
- **JWT (JSON Web Tokens):** For stateless authentication.
- **Argon2:** The winner of the Password Hashing Competition. More secure than bcrypt for modern hardware.
- **Helmet.js:** To secure Express apps by setting various HTTP headers.

### 7. Performance & Scaling
- **Redis:** In-memory data structure store, used as a database, cache, and message broker. Essential for session management and rate limiting.

### 8. Reliability (Testing & Logging)
- **Jest & Supertest:** For Unit and Integration testing.
- **Winston:** A logger for just about everything. Supports multiple transports (Console, File, Cloud).
- **Morgan:** HTTP request logger middleware for Node.js.

---
*Document updated by Antigravity Mentor. Project architecture: Pro Monorepo.*
