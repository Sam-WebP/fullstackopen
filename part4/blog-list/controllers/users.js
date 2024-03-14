const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (password.length < 3) {
    return response.status(401).json({
      error: 'password must be at least 3 characters long'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const { id } = request.params
  const user = await User.findById(id)
  response.json(user)
}) 

usersRouter.get('/username/:username', async (request, response) => {
  const { username } = request.params

  try {
    const user = await User.findOne({ username: username })
    if (user) {
      response.json(user)
    } else {
      response.status(404).send({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user by username:', error)
    response.status(500).send({ error: 'Internal server error' })
  }
})

usersRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const userUpdate = request.body;
  console.log("🚀 ~ usersRouter.put ~ userUpdate:", userUpdate)

  try {

    if (userUpdate.passwordHash) {
      if (userUpdate.passwordHash.length < 3) {
        return response.status(401).json({
          error: 'password must be at least 3 characters long'
        })
      }
    
      const saltRounds = 10
      const passwordH = await bcrypt.hash(userUpdate.passwordHash, saltRounds)
      console.log("🚀 ~ BBEFORE CHANGE:", userUpdate.passwordHash)
      userUpdate.passwordHash = passwordH
      console.log("🚀 ~ AFTER CHANGE:", userUpdate.passwordHash)
    }

    const updatedUser = await User.findByIdAndUpdate(id, userUpdate, { new: true, runValidators: true, context: 'query' });

    if (updatedUser) {
      response.json(updatedUser);
    } else {
      response.status(404).send({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    response.status(400).send({ error: error.message });
  }
});


module.exports = usersRouter