'use strict'

const User = use('App/Models/User');

class RegisterController {
    index({ request, response, auth, view, session, }) {
        return view.render('auth/register', {title: "Register"});
    }

    register({ request, response, session, auth }) {
        const { username, email, password, password_confirmation } = request.all();

        User.create({
            username: username,
            email: email,
            password: password
        });

        return response.redirect('/auth/login', false, 301);
    }
}

module.exports = RegisterController
