'use strict'

const User = use('App/Models/User');

class VerifyController {

    async index({ request, response, auth, view, session, params }) {

        let user = await User.findOrFail(params.user_id);
        
        if(user.verify_token == params.token && user.verify_token != null){
            user.verify_at = Date.now();
            user.reset_at = Date.now();
        }

        user.verify_token = null;

        console.log(user);
        await user.save();

        return response.redirect('/auth/login', false, 301);

    }

}

module.exports = VerifyController
