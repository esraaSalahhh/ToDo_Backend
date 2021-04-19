const UserController  = require('../controllers/user_controller');
module.exports = (app) =>{
  // app.get('/api/users',
  // UserController.all);

  app.post('/api/Register',
  UserController.Register);

  app.post('/api/Login',
  UserController.Login);

  app.get('/confirmation/:email/:token',
  UserController.confirmEmail);

  // app.put('/api/clients/:id',
  // ClientController.edit);

  // app.delete('/api/clients/:id',
  // ClientController.delete)


}
