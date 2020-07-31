'use strict'

class VerifyController {
    index({ request, response, auth, view, session, }) {
        return view.render('auth/verify', {title: "Verify"});
    }

    verify({ request, response, auth, session, }) {
        return response.send("TEST");
    }
}

module.exports = VerifyController
