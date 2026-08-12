import request from 'supertest';
import app from '../../src/app';

describe('e2e placeholder', () => {
  it('health endpoint', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
  });
});
