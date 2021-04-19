const Todo = require('../models/Todo');


module.exports = {
 
  all(req, res, next){
    const ID = req.params.id;
    Todo.find({_userId:ID})
    .then(t => res.status(200).send(t))
    .catch(next)
  },

add(req, res, next) {
    const todo = req.body;
     Todo.create(todo)
    .then(t =>
        res.status(201).send(t))
    .catch(next); 
   
},
 Mark(req, res, next){
    const textID = req.params.id;
    const checkmart = { $set: { "status" : true } };
    Todo.findByIdAndUpdate({_id: textID}, checkmart)
    .then(() => Todo.findById({_id: textID}))
    .then(cl => res.status(200).send(cl))
    .catch(next);
  },

  delete(req, res, next){
    const textID = req.params.id;
    Todo.findByIdAndRemove({_id: textID})
      .then(cl => res.status(204).send(cl))
      .catch(next);
  }
};


