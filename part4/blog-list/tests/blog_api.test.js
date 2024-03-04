const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert');
const api = supertest(app)
const Blog = require('../models/blog')

const helper = require('./test_helper')
const funcTesting = require('../utils/api_functions')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('Returns the correct amount of blog posts in the JSON format', async () => {
  const response = await api
  .get('/api/blogs')
  .expect(200)
  .expect('Content-Type', /application\/json/)
  
  assert.strictEqual(response.body.length, 6)
})

test('ID field is named "id"', async () => {
  const response = await api
  .get('/api/blogs')

  assert.strictEqual(funcTesting.checkID(response), true)
})

after(async () => {
  await mongoose.connection.close()
})