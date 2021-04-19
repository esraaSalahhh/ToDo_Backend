const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tokenSchema = new Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    token: {
        type: String,
        required: true
    },
    expireAt: {
        type: Date,
        default: Date.now,
        index: { expires: 86400000 }
    }
});

const Token = mongoose.model('tokens', tokenSchema);

module.exports = Token;