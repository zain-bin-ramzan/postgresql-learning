const request = require('supertest');
const app = require('../../src/app.js');
const postRepository = require('../../src/repositories/post.repository');
const pool = require('../../src/config/db.config');
beforeAll(async () => {
  // NOTE: we can return the promise to the beforeAll
  return pool.connect({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'todo_hub_test',
    password: process.env.DB_PASSWORD || 'test1234',
    port: process.env.DB_PORT || 5432,
  });
});
afterAll(() => {
  return pool.end();
});
describe('Users API', () => {
  // it is not very common to make this kind of insertion but it is a good way to test the endpoints but and being used a lot
  it('should create a new post', async () => {
    const totalPostsOnStarting = await postRepository.getTotal();
    expect(totalPostsOnStarting).toBe(0);

    await request(app()).post('/posts').send({ url: 'https://www.google.com', lat: 10, lng: 10 });
    const totalPostsOnEnding = await postRepository.getTotal();
    expect(totalPostsOnEnding).toBe(totalPostsOnStarting + 1);
  });
});
