'use strict'

const User = use('App/Models/User');
const hash = require('object-hash');
const Mail = use('Mail');

class ResetController {
    index({ request, response, auth, view, session }) {
        return view.render('/auth/reset', {title: "Reset"});
    }

    async send({ request, response, auth, session }){
        const { email } = request.all();
        let user = await User.findBy('email', email);

        if (user != null){
            let token = hash(Math.random().toString(36).substring(2));
            user.reset_token = token;
            user.reset_at = null;

            user.save();

            await Mail.send('emails.resetAccount', {
                route: '/auth/reset/' + token
            }, (message) => {
                message
                    .to(user.email)
                    .from('service@tranquil-gorge-19560.herokuapp.com')
                    .subject('Reset your account')
            })

            return response.redirect('/auth/login', false, 301);
        }
    }

    resetInfo({ request, response, auth, view, session, params}) {
        return view.render('auth/resetInfo', {title: "Reset", token: params.token});
    }

    async reset({ request, response, auth, session, params }) {
        const { email, password, password_confirmation } = request.all();
        let user = await User.findBy('email', email);

        if(user.email == email && user.reset_token == params.token){
            user.password = password;
            user.reset_token = null;
            user.reset_at = Date.now();

            user.save();
        }

        return response.redirect('/auth/login', false, 301);
    }
}

module.exports = ResetController
