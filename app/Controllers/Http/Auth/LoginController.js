'use strict'

class LoginController {

    index({ request, response, auth, view, session, }) {
        return view.render('auth/login', {title: "Login"});
    }

    async login({ request, response, auth, session, }) {
        const { email, password } = request.all();
        await auth.attempt(email, password);
        return response.redirect('/todo', false, 301);
    }

    async logout({ request, response, auth, session, }) {
        await auth.logout();
        return response.redirect('/', false, 301);
    }
}

module.exports = LoginController
