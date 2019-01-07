'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Event extends Model {
  static boot () {
    super.boot()

    this.addHook('afterCreate', 'EventHook.sendNewMail')
    this.addHook('beforeUpdate', 'EventHook.sendNewMail')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Event
