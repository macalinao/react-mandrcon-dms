import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import P from 'bluebird';

P.promisifyAll(bcrypt);

const SALT_WORK_FACTOR = 10;

let UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: String,
  admin: {
    type: Boolean,
    default: false
  }
});

UserSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSaltAsync(SALT_WORK_FACTOR).then((salt) => {
    // hash the password along with our new salt
    return bcrypt.hashAsync(user.password, salt);
  }).then((hash) => {
    // override the cleartext password with the hashed one
    user.password = hash;
  });

  next();
});

UserSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compareAsync(candidatePassword, this.password);
};

export default mongoose.model('User', UserSchema);
