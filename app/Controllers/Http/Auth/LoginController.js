'use strict'

const User = use('App/Models/User');

class LoginController {

    async index({ request, response, auth, view, session }) {
        return view.render('auth/login', {title: "Login"});
    }

    async login({ request, response, auth, session }) {
        const { email, password } = request.all();
       
        try {
            let user = await User.findByOrFail('email', email);

            if (user.verifyAt != null && user.resetAt != null) {
                try {
                    await auth.attempt(email, password);
                } catch (error) {
                    session.flash({ error: 'Your login information does not match!'});
                    return response.redirect('back');
                }

            } else {
                session.flash({ error: 'Your account is not verified, check your email!'});
                return response.redirect('back');
            }
        }
        catch(err){
            session.flash({ error: 'You do not have an account!' });
            return response.redirect('back');
        }
        
        return response.redirect('/todo', false, 301);
    }

    async logout({ request, response, auth, session }) {
        await auth.logout();
        return response.redirect('/', false, 301);
    }
}

module.exports = LoginController
