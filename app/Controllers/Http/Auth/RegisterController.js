'use strict'

const User = use('App/Models/User');
const hash = require('object-hash');
const Mail = use('Mail');

class RegisterController {

    index({ request, response, auth, view, session, }) {
        return view.render('auth/register', {title: "Register"});
    }

    async register({ request, response, session, auth }) {
        const { username, email, password } = request.all();

        let token = hash(Math.random().toString(36).substring(2));

        let user = await User.create({
            username: username,
            email: email,
            password: password,
            verify_token: token
        });

        await Mail.send('emails.verifyAccount', {
            route: '/auth/verify/' + user.id + "/" + token
        }, (message) => {
            message
                .to(user.email)
                .from('service@tranquil-gorge-19560.herokuapp.com')
                .subject('Verify your account')
        })

        return response.redirect('/auth/login', false, 301);
    }
}

module.exports = RegisterController
