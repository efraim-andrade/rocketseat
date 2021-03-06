'use strict'

const Antl = use('Antl')

class UserUpdate {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      username: 'unique:users',
      password: 'min:6|max:20|confirmed'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = UserUpdate
