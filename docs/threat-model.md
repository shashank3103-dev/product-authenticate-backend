# Threat Model

High level threats: credential theft, SQL injection (Prisma limits raw SQL), broken auth flows, and misconfigured secrets.
Mitigations: bcrypt hashing, input validation, least-privilege DB user, rotate secrets.
