'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const date = require('date-and-time');

class User extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }

    todos () {
        return this.hasMany('App/Models/Todo');
    }

    // setter to format date field
    setVerifyAt(verifyAt){
        return date.format(verifyAt, 'YYYY-MM-DD HH:mm:ss');
    }

    // setter to format date field
    setResetAt(resetAt){
        return date.format(resetAt, 'YYYY-MM-DD HH:mm:ss');
    }
}

module.exports = User
