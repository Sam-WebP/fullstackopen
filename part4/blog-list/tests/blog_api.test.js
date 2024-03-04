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
    .expect(200)

  assert.strictEqual(funcTesting.checkID(response), true)
})

test('Adding a new blog post increases the count by one', async () => {
  const firstResponse = await api.get('/api/blogs')
  const initialBlogCount = firstResponse.body.length

  const newBlog = {
    title: "World of Parts",
    author: "Justin Wakim",
    url: "https://worldofparts.com.au/",
    likes: 52
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const secondResponse = await api.get('/api/blogs')
  const finalBlogCount = secondResponse.body.length

  assert.strictEqual(finalBlogCount, initialBlogCount + 1)
})

test('If the likes property is missing, it defaults to 0', async () => {
  const newBlog = {
    title: "A Blog Without Likes",
    author: "Author Unknown",
    url: "https://example.com/blog-without-likes"
  }

  const postResponse = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const createdBlogId = postResponse.body.id 

  const createdBlog = await api
    .get(`/api/blogs/${createdBlogId}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(createdBlog.body.likes, 0)
})

test('If the title property is missing, status code 400', async () => {
  const newBlog = {
    author: "Justin Wakim",
    url: "https://worldofparts.com.au/",
    likes: 52
  }

    const postResponse = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  assert.strictEqual(postResponse.status, 400)
})

test('If the url property is missing, status code 400', async () => {
    const newBlog = {
      title: "Testing without the URL",
      author: "Justin Wakim",
      likes: 52
    }
  
      const postResponse = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    assert.strictEqual(postResponse.status, 400)
  })

after(async () => {
  await mongoose.connection.close()
})