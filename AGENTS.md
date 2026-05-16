# Repository Guidelines

## Project Structure & Module Organization

This is a pnpm workspace with two active packages: `backend` and `frontend`. Backend source lives in `backend/src`, with feature modules under `backend/src/modules/<feature>` using `*.controller.ts`, `*.service.ts`, `*.routes.ts`, and optional `*.dto.ts` files. Shared backend helpers are in `backend/src/lib`, `backend/src/middlewares`, and `backend/src/utils`. Prisma schema and migrations are in `backend/prisma`; uploaded/static backend assets are in `backend/public`.

Frontend source lives in `frontend/src`. Pages are in `frontend/src/pages`, reusable UI/layout pieces are in `frontend/src/components`, API wrappers are in `frontend/src/services`, and React contexts are in `frontend/src/contexts`. Static frontend assets are in `frontend/public`; project notes live in `docs` and `tech_stack.md`.

## Build, Test, and Development Commands

Use pnpm as the package manager (`pnpm-lock.yaml` is authoritative).

- `pnpm --filter backend dev`: run the Express/Socket.io API with `nodemon` and `tsx`.
- `pnpm --filter backend test`: run backend Jest tests in watch mode.
- `pnpm --filter frontend dev`: start the Vite React development server.
- `pnpm --filter frontend build`: create a production frontend build.
- `pnpm --filter frontend lint`: run ESLint for frontend JS/JSX.
- `docker compose up db`: start the local PostgreSQL service configured by `.env`.

## Coding Style & Naming Conventions

Backend uses TypeScript with `strict` enabled, CommonJS output, and path alias support for `@/`. Keep backend files grouped by feature module and use names such as `task.service.ts` or `auth.integration.test.ts`. Frontend uses React JSX modules; name components in `PascalCase` and services/utilities in `camelCase`. Follow the existing 2-space indentation and semicolon-light JavaScript style.

## Testing Guidelines

Backend tests use Jest with `ts-jest` and Node environment. Test files must end in `.test.ts`; place them beside the module they cover, as in `backend/src/modules/auth/auth.service.test.ts`. Add service tests for business logic and integration tests for API behavior. Ensure required database environment variables exist because Jest loads `dotenv/config`.

## Commit & Pull Request Guidelines

Recent history follows Conventional Commit style, for example `feat(tasks): implement real-time CRUD and drag-drop reordering` and `fix: Handle Sidebar mapping error`. Use `feat`, `fix`, `style`, `refactor`, or `test`, with an optional scope. Pull requests should describe the change, list validation commands, link issues, and include screenshots for visible frontend changes.

## Security & Configuration Tips

Do not commit `.env` or secrets. Keep database changes in Prisma migrations, and coordinate generated Prisma client updates with schema changes. Validate API input with existing DTO/Zod patterns and keep auth, upload, and rate-limit middleware in the request path for protected endpoints.
