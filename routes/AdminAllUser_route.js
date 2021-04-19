const AdminUserController  = require('../controllers/AdminAllUser_controller');
module.exports = (app) =>{
  app.get('/api/Admin/All_Users',
  AdminUserController.all);
}
