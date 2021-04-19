const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const todoSchema = new Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    text: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
});

const Todo = mongoose.model('todos', todoSchema)
module.exports = Todo; 