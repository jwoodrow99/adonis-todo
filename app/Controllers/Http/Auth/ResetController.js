'use strict'

const User = use('App/Models/User');
const hash = require('object-hash');
const Mail = use('Mail');
const Env = use('Env')

class ResetController {
    index({ request, response, auth, view, session }) {
        return view.render('/auth/reset', {title: "Reset"});
    }

    async send({ request, response, auth, session }){
        const { email } = request.all();

        try{
            let user = await User.findBy('email', email);

            if (user != null){
                let token = hash(Math.random().toString(36).substring(2));
                user.reset_token = token;
                user.resetAt = null;

                user.save();

                await Mail.send('emails.resetAccount', {
                    route: Env.get('APP_URL') + '/auth/reset/' + token
                }, (message) => {
                    message
                        .to(user.email)
                        .from('service@tranquil-gorge-19560.herokuapp.com')
                        .subject('Reset your account')
                })

                session.flash({ message: 'Check your email to reset your account!' });
                return response.redirect('/auth/login', false, 301);
            }

        } catch(err) {
            session.flash({ error: 'You do not have an account to reset!' });
            return response.redirect('/auth/login', false, 301);
        }
    
    }

    resetInfo({ request, response, auth, view, session, params}) {
        return view.render('auth/resetInfo', {title: "Reset", token: params.token});
    }

    async reset({ request, response, auth, session, params }) {
        const { email, password, password_confirmation } = request.all();

        try{

            let user = await User.findBy('email', email);

            if(user.email == email && user.reset_token == params.token){
                let now = new Date();
                user.password = password;
                user.reset_token = null;
                user.resetAt = now;

                user.save();
            }

            session.flash({ error: 'Your account has been reset!' });
            return response.redirect('/auth/login', false, 301);

        } catch(err) {
            session.flash({ error: 'The information given was invalid!' });
            return response.redirect('/auth/login', false, 301);
        }
    }
}

module.exports = ResetController
