const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1 })
  response.json(blogs)
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
    const user = request.user
    if (!user) {
      return response.status(401).send({ error: 'User not authenticated' })
    }

    const { body } = request
    console.log('Request body:', body)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user.id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (error) {
    console.error('Error in blogsRouter.post:', error)
    if (error.name === 'ValidationError') {
      response.status(400).send({ error: error.message })
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

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user

  if (!user) {
    return response.status(401).send({ error: 'User not authenticated' })
  }

  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' })
  }


})

module.exports = blogsRouter