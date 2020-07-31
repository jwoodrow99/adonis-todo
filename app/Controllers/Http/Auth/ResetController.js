'use strict'

class ResetController {
    index({ request, response, auth, view, session, }) {
        return view.render('auth/reset', {title: "Reset"});
    }

    reset({ request, response, auth, session, }) {
        return response.send("TEST");
    }
}

module.exports = ResetController
