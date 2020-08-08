'use strict'

// Best Password REGEX
// (?!^[0-9]*$)(?!^[a-zA-Z!@#$%^&*()_+=<>?]*$)^([a-zA-Z!@#$%^&*()_+=<>?0-9].*)$

class User {
    get rules () {
        return {
            email: 'required|email|unique:users',
            password: 'required|min:5|confirmed'
        }
    }

    get messages () {
        return {
            'email.required': 'You must provide a email address.',
            'email.email': 'You must provide a valid email address.',
            'email.unique': 'This email is already registered.',
            'password.required': 'You must provide a password',
            'password.confirmed': 'Your passwords do not match.'
        }
  }
}

module.exports = User
