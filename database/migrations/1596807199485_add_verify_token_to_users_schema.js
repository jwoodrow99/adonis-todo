'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddVerifyTokenToUsersSchema extends Schema {
  up () {
    this.alter('users', (table) => {
        table.string('verify_token').nullable().default(null);
        table.dateTime('verify_at').nullable().default(null);
    })
  }

  down () {
    this.alter('users', (table) => {
        table.dropColumn('verify_token');
        table.dropColumn('verify_at');
    })
  }
}

module.exports = AddVerifyTokenToUsersSchema
