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
}

module.exports = User
