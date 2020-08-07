'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddResetTokenToUsersSchema extends Schema {
  up () {
    this.alter('users', (table) => {
        table.string('reset_token').nullable().default(null);
        table.string('reset_at').nullable().default(null);
    })
  }

  down () {
    this.alter('users', (table) => {
        table.dropColumn('reset_token');
        table.dropColumn('reset_at');
    })
  }
}

module.exports = AddResetTokenToUsersSchema
