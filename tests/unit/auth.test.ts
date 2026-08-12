import request from 'supertest';
import app from '../../src/app';

jest.mock('@prisma/client', () => {
  const mPrisma = {
    user: {
      create: jest.fn(async ({ data }) => ({ id: 1, email: data.email })),
      findUnique: jest.fn(async ({ where }) => {
        if (where.email === 'exists@example.com') return { id: 1, email: where.email, password: '$2b$10$saltsaltsalt' };
        return null;
      })
    }
  };
  return { PrismaClient: jest.fn(() => mPrisma) };
});

describe('Auth routes', () => {
  it('registers a user', async () => {
    const res = await request(app).post('/api/auth/register').send({ email: 'new@example.com', password: 'password123' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('email', 'new@example.com');
  });

  it('fails login for non-existent user', async () => {
    const res = await request(app).post('/api/auth/login').send({ email: 'nope@example.com', password: 'password123' });
    expect(res.status).toBe(401);
  });
});
