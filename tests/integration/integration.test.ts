import request from 'supertest';
import app from '../../src/app';

describe('integration placeholder', () => {
  it('returns health', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });
});
