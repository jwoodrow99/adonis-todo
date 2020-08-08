'use strict'

const User = use('App/Models/User');

class VerifyController {

    async index({ request, response, auth, view, session, params }) {

        try {
            let user = await User.findOrFail(params.user_id);

            if(user.verify_token == params.token && user.verify_token != null){
                let now = new Date();
                user.verifyAt = now;
                user.resetAt = now;
            } else {
                console.log('verify error');
                session.flash({ error: 'Your account appears to already be verified.'});
                return response.redirect('/auth/login', false, 301);
            }

            user.verify_token = null;
            await user.save();

        } catch(err){
            session.flash({ error: 'Your account appears to already be verified.'});
            return response.redirect('/auth/login', false, 301);
        }

        session.flash({ message: 'Your account is Verified!'});
        return response.redirect('/auth/login', false, 301);

    }

}

module.exports = VerifyController
