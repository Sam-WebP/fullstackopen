const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.get('/:id', (request, response) => {
  const { id } = request.params

  Blog
    .findById(id)
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', async (request, response) => {
  try {
    const blog = new Blog(request.body)
    const result = await blog.save()
    response.status(201).json(result)
  } catch (error) {
    if (error.name === 'ValidationError') {
      response.status(400).send({ error: error.message });
    } else {
      response.status(500).send({ error: 'Internal server error' })
    }
  }
})

blogsRouter.put('/:id', (request, response) => {
  const { id } = request.params
  const blogUpdate = request.body

  Blog.findByIdAndUpdate(id, blogUpdate, { new: true, runValidators: true, context: 'query' })
    .then(updatedBlog => {
      if (updatedBlog) {
        response.json(updatedBlog)
      } else {
        response.status(404).end()
      }
    })
})

blogsRouter.delete('/:id', (request, response) => {
  Blog.findByIdAndDelete(request.params.id)
    .then(response.status(204).end())
})

module.exports = blogsRouter