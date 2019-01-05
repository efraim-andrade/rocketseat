'use strict'

const User = use('App/Models/User')

class UserController {
  async store ({ request, response }) {
    const data = await request.only(['email', 'password', 'username'])

    const user = await User.create(data)

    return user
  }
}

module.exports = UserController
