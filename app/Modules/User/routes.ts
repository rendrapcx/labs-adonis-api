import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.get('/', 'UsersController.index').middleware('auth')
    Route.post('/login', 'UsersController.login')
    Route.post('/logout', 'UsersController.logout')
    Route.post('/register', 'UsersController.register')
  }).prefix('v1')
}).prefix('api')
