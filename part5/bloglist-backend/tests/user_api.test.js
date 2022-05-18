const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/user');

const api = supertest(app);

const initialUser = [
  { username: 'Duckie duck', name: 'Duckie', password: 'duckie.com' },
];

beforeEach(async () => {
  await User.deleteMany({});
  for (const iterator of initialUser) {
    let userObject = new User(iterator);
    await userObject.save();
  }
});

test('Invalid user is not added and return appropriate status', async () => {
  await api
    .post('/api/users')
    .send({ username: 'Duckie duck', name: 'Daffy', password: '123' })
    .expect(400);

  const users = await api.get('/api/users');
  expect(users.body).toHaveLength(initialUser.length);
});

afterAll(() => {
  mongoose.connection.close();
});
