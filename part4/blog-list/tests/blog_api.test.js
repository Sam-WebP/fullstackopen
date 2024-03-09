const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert');
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const funcTesting = require('../utils/api_functions');
const jwt = require('jsonwebtoken');

let dummyUserId

beforeEach(async () => {
    await Blog.deleteMany({}),
    await Blog.insertMany(helper.initialBlogs),
    await User.deleteMany({})

  const insertedUsers = await User.insertMany(helper.initialUsers)
  dummyUserId = insertedUsers[0].id.toString()

  token = jwt.sign({ id: dummyUserId }, process.env.SECRET)
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
      likes: 52,
      userId: dummyUserId
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
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
      url: "https://example.com/blog-without-likes",
      userId: dummyUserId
    }
  
    const postResponse = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
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
      likes: 52,
      userId: dummyUserId
    }
  
      const postResponse = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
  
    assert.strictEqual(postResponse.status, 400)
  })
  
  test('If the url property is missing, status code 400', async () => {
      const newBlog = {
        title: "Testing without the URL",
        author: "Justin Wakim",
        likes: 52,
        userId: dummyUserId
      }
    
        const postResponse = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
    
      assert.strictEqual(postResponse.status, 400)
  })  
})

describe('DELETING REQUESTS', () => { 

  test('Deleting a blog', async () => {
    const initialResponse = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const testBlog = initialResponse.body[0]
  
    await api
      .delete(`/api/blogs/${testBlog.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
  
    const secondResponse = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    assert.strictEqual(helper.checkDeleted(secondResponse.body, testBlog.id), true)
  })
    
})

describe('PUT REQUESTS', () => { 
  test('Updating the likes', async () => {
  
    const newBlog = {
      title: "Testing updating the likes",
      author: "Samuel Moran",
      url: "http://updatingthelikes.com.au",
      likes: 5,
      userId: dummyUserId
    }
  
    const postResponse = await api
      .post(`/api/blogs/`)
      .set('Authorization', `Bearer ${token}`)
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