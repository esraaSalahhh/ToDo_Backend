const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
saltRounds = 10;
const UserSchema = new Schema({
  firstName: {
    type: String,
    minlength: 3,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'User Email required']
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  // created_at: {
  //   type: Date,
  //   default: Date.now
  // },
  // updated_at: {
  //   type: Date,
  //   default: Date.now
  // }
});


UserSchema.pre('save', async function () {
  if (this.isModified('password'))
    this.password = await bcrypt.hash(this.password, saltRounds)
});

const User = mongoose.model('users', UserSchema);

module.exports = User;
