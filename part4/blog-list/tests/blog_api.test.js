const { test, after, beforeEach, describe } = require('node:test')
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

describe('GET REQUESTS', () => {
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
})

describe('POST REQUESTS', () => {
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
})

describe('Check for missing required fields', () => { 
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
})

describe('DELETING REQUESTS', () => { 
  test('Deleting a blog', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)  
    
    await api
      .delete(`/api/blogs/65e5c8c630c22b1be9f8b271`) 
      .expect(204)
  
    assert.strictEqual(helper.checkDeleted(response.body, '65e5c8c630c22b1be9f8b271'), true)
  })
})

describe('PUT REQUESTS', () => { 
  test('Updating the likes', async () => {
  
    const newBlog = {
      title: "Testing updating the likes",
      author: "Samuel Moran",
      url: "http://updatingthelikes.com.au",
      likes: 5,
    }
  
    const postResponse = await api
    .post(`/api/blogs/`)
    .send(newBlog)
    .expect(201)
  
    const createdBlogId = postResponse.body.id 
  
    await api
    .put(`/api/blogs/${createdBlogId}`)
    .send({ likes: 1000 })
  
    const response = await api.get(`/api/blogs/${createdBlogId}`)
  
    assert.strictEqual(response.body.likes, 1000)
  })  
})


after(async () => {
  await mongoose.connection.close()
})