# Architecture

This project is a small Express + TypeScript service using Prisma for Postgres access. Key layers:
- src/routes — HTTP routes
- src/controllers — request handlers
- src/services — business logic
- src/repositories — DB access (Prisma)
- src/schemas — request validation (Zod)
- prisma — DB schema and migrations
