const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

const initialBlog = [
  { title: 'Duckie duck', author: 'Duckie', url: 'duckie.com', likes: 2 },
  { title: 'Doggie dog', author: 'Doggie', url: 'doggie.com', likes: 5 },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  for (const iterator of initialBlog) {
    let blogObject = new Blog(iterator);
    await blogObject.save();
  }
});

test('Returns correct amount of blog post', async () => {
  const returnedBlog = await api.get('/api/blogs');

  expect(returnedBlog.body).toHaveLength(initialBlog.length);
});

test('id is defined in one of the object', async () => {
  const returnedBlog = await api.get('/api/blogs');

  expect(returnedBlog.body[0].id).toBeDefined();
});

afterAll(() => {
  mongoose.connection.close();
});
