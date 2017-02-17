'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.group('api', () =>
{
    Route.post('login', 'AuthController.login')
    Route.post('register', 'AuthController.register')

    Route.post('verify', 'AuthController.verify').middleware('auth')
}).prefix('api')

Route.any('*', 'ServerController.render')
