const { test, after, beforeEach, describe } = require('node:test')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert');
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { default: mongoose } = require('mongoose')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    // const token = jwt.sign({ id: dummyUserId }, process.env.SECRET)

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api
      .get('/api/users')
      .expect('Content-Type', /application\/json/)

    const usernames = response.body.map(user => user.username)

    assert.strictEqual(usernames.includes('mluukkai'), true)
  })

  test('User with password less than 3 characters is not created', async () => {
    const newUser = {
      "username": "TestShortPassword",
      "name": "Name for test",
      "password": "ab"
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.error, "password must be at least 3 characters long")
  })


})



after(async () => {
    await mongoose.connection.close()
  })