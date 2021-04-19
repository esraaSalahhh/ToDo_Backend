const User = require('../models/user');

module.exports = {
 
    all(req, res, next){
      User.find({})
      .then(cl => res.status(200).send(cl))
      .catch(next)
    },

}
