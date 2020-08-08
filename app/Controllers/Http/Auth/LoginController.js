'use strict'

const User = use('App/Models/User');

class LoginController {

    index({ request, response, auth, view, session }) {
        return view.render('auth/login', {title: "Login"});
    }

    async login({ request, response, auth, session }) {
        const { email, password } = request.all();
        let user = await User.findByOrFail('email', email);

        if (user.verifyAt != null && user.resetAt != null) {
            await auth.attempt(email, password);
        }
        
        return response.redirect('/todo', false, 301);
    }

    async logout({ request, response, auth, session }) {
        await auth.logout();
        return response.redirect('/', false, 301);
    }
}

module.exports = LoginController
