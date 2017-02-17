'use strict'

const User = use('App/Model/User')
const Validator = use('Validator')

class AuthController {

    * login (request, response )
    {
        const sanitizedData = Validator.sanitize( request.all(), User.sanitizationRules )

        try {
            const token = yield request.auth.attempt( sanitizedData.email, sanitizedData.password )
            const user = yield User.query().where( 'email', sanitizedData.email ).first()
            response.json({
                token: token,
                user: {
                    name: user.name,
                    surname: user.surname,
                    active: user.active
                }
            })
        } catch (e)
        {
            response.unauthorized( { error: 'Unable to Authenticate' } )
        }
    }

    * register (request, response )
    {
        const userData = request.all()
        const validation = yield Validator.validate( userData, User.rules)

        if ( validation.fails() )
        {
            response.status(500).json( validation.messages() )
            return
        }

        const sanitizedData = Validator.sanitize( userData, User.sanitizationRules )

        const user = new User()
        user.name = sanitizedData.name
        user.surname = sanitizedData.surname
        user.email = sanitizedData.email
        user.password = sanitizedData.password
        user.mobile = sanitizedData.mobile
        user.verify = (Math.floor(Math.random()*90000) + 10000).toString(); // Generate Random 5 digit Number
        user.active = false
        yield user.save()

        // Attempt to Automatically login
        try {
            const token = yield request.auth.generate( user )
            response.json({
                token: token,
                user: {
                    name: user.name,
                    surname: user.surname,
                    active: user.active
                }
            })
        } catch (e)
        {
            response.send( { error: 'Unable to Authenticate after Registration.'})
        }

        return
    }

    * verify ( request, response )
    {

        const user = yield request.auth.getUser()
        const verify = request.input('verify')

        if ( user.verify === verify )
        {
            user.active = 1
            yield user.save()

            response.json({
                user: {
                    name: user.name,
                    surname: user.surname,
                    active: user.active
                }
            })
            return
        }

        response.status(500).json( { error: 'Unable to Verify you at this time.' } )
        return
    }
}

module.exports = AuthController
