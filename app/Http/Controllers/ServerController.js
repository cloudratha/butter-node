'use strict'

class ServerController {
    * render ( request, response )
    {
        request.request.auth = request.auth
        yield response.sendView( 'master' )
    }
}

module.exports = ServerController
