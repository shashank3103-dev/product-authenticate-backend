# Product Authentication Backend — Copilot Instructions

## Project

This is a production-grade product authentication and packaging backend.

The system allows:

1. Manufacturing/package operators to register products.
2. The system to generate unique cryptographically random product authentication tokens.
3. Tokens to be represented as QR-code URLs.
4. Packaging operators to activate products.
5. Customers to scan QR codes and reach the official verification domain.
6. The backend to verify the product without exposing internal data.
7. The system to record verification/scan events.
8. The system to detect suspicious repeated QR usage.
9. Administrators to create, activate, revoke and inspect products.
10. Cartons to contain multiple serialized products.

## Technology

Required stack:

- Node.js
- TypeScript
- Express
- PostgreSQL
- Prisma ORM
- Zod
- JWT
- Docker
- Docker Compose
- REST API
- Vitest or Jest
- ESLint
- Prettier

Do not replace the required stack without explicit approval.

## Architecture

Use:

HTTP Request
→ Router
→ Controller
→ Service
→ Repository/Data Access
→ Prisma
→ PostgreSQL

Do not put business logic directly inside controllers.

Controllers must remain thin.

Services contain business rules.

Repositories/data-access modules contain database operations.

Zod schemas validate all untrusted input.

## Security

Security is a first-class requirement.

Never:

- hardcode secrets
- commit `.env`
- expose database credentials
- expose JWT secrets
- expose refresh tokens
- expose QR authentication tokens in logs
- expose password hashes
- expose token hashes
- expose internal database IDs unnecessarily
- return complete Prisma records from public endpoints
- trust client-provided authorization state
- put secrets in JWT payloads
- put sensitive information inside QR codes

Use environment variables for secrets.

Use HTTPS in production.

Use secure HTTP headers.

Use strict CORS.

Use rate limiting.

Validate all external input with Zod.

Use parameterized/database-safe Prisma queries.

Use least-privilege database credentials.

Never expose PostgreSQL directly to the public internet.

## Product Authentication

Every product must have a unique cryptographically random authentication token.

Never use sequential public identifiers such as:

product-10001
product-10002
product-10003

Generate high-entropy random tokens using Node.js cryptographic APIs.

The raw authentication token must only exist where necessary.

Do not store raw authentication tokens in PostgreSQL.

Store a keyed HMAC-SHA-256 digest using a server-side secret pepper.

QR URL example:

https://verify.example.com/p/<opaque-token>

The QR must contain no:

- database ID
- SKU
- batch secrets
- API key
- JWT
- password
- internal information

## Verification

Public verification must reveal only minimum required information.

Public endpoint:

GET /api/v1/verify/:token

Possible states:

- AUTHENTIC
- PREVIOUSLY_VERIFIED
- SUSPICIOUS
- INVALID
- REVOKED
- UNACTIVATED

Do not reveal internal reasons for failure to attackers.

Internally log security-relevant details without logging the raw authentication token.

## Scan Detection

Record:

- verification ID
- authenticator ID
- result
- timestamp
- coarse geographic information when available
- request metadata required for abuse detection

Do not store unnecessary personal information.

Repeated scans must not automatically mean counterfeit.

Use them as signals for suspicious activity.

## Product Lifecycle

Product states:

UNACTIVATED
ACTIVE
REVOKED

Valid lifecycle:

UNACTIVATED → ACTIVE
ACTIVE → REVOKED

Do not allow invalid state transitions.

## Admin Authentication

Admin endpoints require authentication.

Use JWT access tokens.

Access tokens must be short-lived.

Use refresh-token rotation if refresh tokens are implemented.

Never store raw refresh tokens.

Hash refresh tokens before persistence.

JWT payload must contain only minimal claims:

- subject
- role
- issuer
- audience
- issued-at
- expiration

Never put secrets or sensitive business data inside JWTs.

## Authorization

Use RBAC.

Roles:

SUPER_ADMIN
ADMIN
PACKAGING_OPERATOR
VIEWER

Every protected endpoint must explicitly define required permissions.

Never rely only on frontend authorization.

## Database

Use PostgreSQL with Prisma.

Use migrations.

Never use destructive database operations against production.

Do not silently modify an existing schema.

Initial project schema changes are authorized during project bootstrap, but destructive or irreversible changes require explicit approval.

Use database indexes for:

- token hash
- SKU
- product status
- batch
- scan timestamp
- foreign keys

Use unique constraints where appropriate.

## Testing

Use TDD.

For every feature:

1. Write failing test.
2. Implement minimum behavior.
3. Run tests.
4. Refactor.
5. Run tests again.

Test:

- unit behavior
- service logic
- authentication
- authorization
- validation
- Prisma integration
- public verification
- token generation
- token hashing
- state transitions
- rate limiting
- invalid input
- security boundaries

Never remove or weaken tests just to make the build pass.

## API

Use versioned APIs:

/api/v1/...

Use consistent response formats.

Use appropriate HTTP status codes.

Never leak stack traces in production responses.

Use centralized error handling.

## Logging

Use structured logging.

Never log:

- passwords
- JWT secrets
- refresh tokens
- raw QR tokens
- token hashes
- database passwords

Use request IDs for tracing.

## Docker

Production services must run using Docker.

Required services:

- api
- postgres

Redis may be added only when justified by the architecture.

Do not expose PostgreSQL publicly.

Use Docker health checks.

Use non-root containers where practical.

Use multi-stage Docker builds.

## Configuration

Use:

.env
.env.example

`.env` must never be committed.

`.env.example` must contain placeholders only.

Example:

DATABASE_URL=
JWT_SECRET=
AUTH_TOKEN_PEPPER=
JWT_ISSUER=
JWT_AUDIENCE=
VERIFY_BASE_URL=

Never put real secrets into `.env.example`.

## Code Quality

Every implementation must pass:

- lint
- typecheck
- tests
- build

Review code across:

1. Correctness
2. Readability
3. Architecture
4. Security
5. Performance

## Git

Use small commits.

Preferred format:

feat:
fix:
refactor:
test:
chore:
docs:
security:

Never mix unrelated changes.

Never commit:

- `.env`
- credentials
- private keys
- certificates
- database dumps
- generated secrets

## Agent Workflow

Before implementing:

1. Inspect the repository.
2. Identify existing architecture.
3. Identify constraints.
4. Create/update specification.
5. Create implementation plan.
6. Identify security risks.
7. Write tests.
8. Implement incrementally.
9. Run verification.
10. Perform security review.
11. Perform code-quality review.
12. Summarize changes.

Do not blindly generate the entire project in one step.

Prefer small, verifiable increments.

When uncertain about a business requirement, ask a focused question.

Never invent security-sensitive behavior.

## Definition of Done

A feature is complete only when:

- implementation exists
- tests exist
- tests pass
- typecheck passes
- lint passes
- build passes
- security review passes
- API behavior is documented
- environment variables are documented
- migration is included when required
- no secrets are committed