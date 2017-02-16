'use strict'

const User = use('App/Model/User')

class AuthController {

    * login (request, response )
    {
        try {
            yield request.auth.attempt( request.uid, request.password )
        } catch (e)
        {
            response.unauthorized( { error: 'Unable to Authenticate'})
        }
    }
}

module.exports = AuthController
