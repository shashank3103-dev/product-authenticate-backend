# API

This repository implements a v1 REST API for product authentication and administration. All endpoints live under /api/v1.

Primary endpoints (summary):

- Auth
  - POST /api/v1/auth/login
  - POST /api/v1/auth/refresh
  - POST /api/v1/auth/logout
  - GET  /api/v1/auth/me

- Users
  - GET    /api/v1/users
  - POST   /api/v1/users
  - GET    /api/v1/users/:userId
  - PATCH  /api/v1/users/:userId
  - DELETE /api/v1/users/:userId

- Products
  - GET    /api/v1/products
  - POST   /api/v1/products
  - GET    /api/v1/products/:productId
  - PATCH  /api/v1/products/:productId
  - DELETE /api/v1/products/:productId

- Authenticators
  - POST /api/v1/authenticators/generate
  - GET  /api/v1/authenticators/:authenticatorId
  - POST /api/v1/authenticators/:authenticatorId/qr
  - POST /api/v1/authenticators/:authenticatorId/activate
  - POST /api/v1/authenticators/:authenticatorId/revoke

- Public verification
  - GET /api/v1/verify/:token

- Scans, Batches, Cartons, Audit-logs
  - Various admin endpoints; see docs/openapi.yaml and docs/api-implementation-plan.md for details

Health & readiness:
- GET /health
- GET /ready

Validation: All request inputs must be validated with Zod. Responses use a consistent wrapper: { "data": ... } or { "error": { code, message } }.

Security notes:
- Use JWT for access tokens and secure refresh token rotation.
- Never store or log raw tokens or passwords.
- Apply RBAC to admin endpoints.

See docs/openapi.yaml for a formal contract. Implementation will follow the plan in docs/api-implementation-plan.md.
