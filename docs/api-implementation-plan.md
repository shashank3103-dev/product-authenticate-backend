# API Implementation Plan

This plan follows the provided API design. Implement only after the design review is approved.

Phases (short):

1. API Design (complete): docs/api.md, docs/openapi.yaml (this file), docs/api-implementation-plan.md
2. Database schema: expand prisma/schema.prisma with models: User, Product, Batch, Authenticator, Scan, Carton, AuditLog, RefreshToken (hashed)
3. Authentication: JWT access tokens, refresh token rotation, hashed refresh tokens stored with device/session metadata
4. Users & RBAC: user CRUD, role enforcement middleware, prevent self-escalation
5. Products: product CRUD, token generation (secure random + HMAC digest with pepper), store digest only
6. Authenticators: generation, activation, revocation, QR generation
7. Verification: public GET /verify/:token — HMAC, lookup, state checks, create scan events
8. Scans & Risk: record scans, implement ScanRiskService and suspicious listing
9. Batches & Cartons: batch APIs and carton operations with transactional checks
10. Audit logs: structured audit entries for security-sensitive actions
11. Tests & OpenAPI validation: unit + integration tests covering all contracts
12. Security hardening & CI: Helmet, CORS, rate limiting, request size limits, request IDs, secrets handling
13. Docker verification & deployment

Implementation tasks per phase (developer checklist):

- Write Zod schemas for each request/response contract
- Create route, controller, service, repository and tests for each endpoint
- Add middleware: auth, rbac, validation, rate-limit placeholder
- Add observability hooks: request ID, structured logs via Winston
- Add database migrations (prisma migrate)
- Add seed scripts for local testing
- Add CI workflow to run tests and lint

Testing strategy:

- Unit tests for services and repositories (mock Prisma)
- Integration tests that run in Docker Compose (Postgres) for critical flows
- Contract tests comparing docs/openapi.yaml to implemented routes where practical

Security review points:

- Ensure refresh token rotation and reuse detection
- Ensure raw tokens are never stored or logged
- Ensure only digests/hashes stored for tokens with pepper
- Ensure RBAC checks for admin-only endpoints
- Ensure rate limiting is present for sensitive endpoints

Delivery plan:

- Implement Phase 3 (Authentication) first, then 4 (Users), then 5-8 incrementally.
- After each phase: tests, lint, build, security scan.

