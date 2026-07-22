import request from 'supertest';
import app from '../src/app';

describe('GET /api/health', () => {
  it('should return 200 and valid health schema', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'UP');
    expect(res.body).toHaveProperty('uptime');
    expect(res.body).toHaveProperty('version');
    expect(res.body).toHaveProperty('runtime');
  });
});