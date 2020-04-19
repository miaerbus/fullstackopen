const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users.map((u) => u.toJSON()))
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  // TODO: check should probably not be here?
  if (body.username.length < 3) {
    return response.status(400).json({
      error: 'Username needs to be at least 3 characters',
    })
  }

  if (body.password.length < 3) {
    return response.status(400).json({
      error: 'Password needs to be at least 3 characters',
    })
  }

  // TODO: check should probably not be here?
  const userExists = await User.find({
    username: body.username,
  })
  if (userExists.length > 0) {
    return response.status(400).json({
      error: 'User already exists',
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter
