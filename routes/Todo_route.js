const TodoController  = require('../controllers/Todo_controller');
module.exports = (app) =>{
  app.get('/api/all_todo/:id',
  TodoController.all);

  app.post('/api/add_todo',
  TodoController.add);

  app.put('/api/mark_todo/:id',
  TodoController.Mark);

  app.delete('/api/delete_todo/:id',
  TodoController.delete)

}
