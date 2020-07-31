'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('home', {title: "Home"}).as('home');
Route.on('/test').render('test', {title: "Test"}).middleware('auth');

Route.resource('todo', 'TodoController').middleware('auth');

// All Auth routes scoped to Controllers/Auth & prefixed with auth
Route.group(() => {
    // Login
    Route.get('login', 'Auth/LoginController.index').as('auth.loginForm');
    Route.post('login', 'Auth/LoginController.login').as('auth.login');
    Route.post('logout', 'Auth/LoginController.logout').as('auth.logout');

    // Register
    Route.get('register', 'Auth/RegisterController.index').as('auth.registerForm');
    Route.post('register', 'Auth/RegisterController.register').as('auth.register').validator('User');

    // Reset
    Route.get('reset', 'Auth/ResetController.index').as('auth.resetForm');
    Route.post('reset', 'Auth/ResetController.reset').as('auth.reset');

    // Verify
    Route.get('verify', 'Auth/VerifyController.index').as('auth.verifyForm');
    Route.post('verify', 'Auth/VerifyController.verify').as('auth.verify');
}).prefix('auth');