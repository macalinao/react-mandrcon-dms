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

UserSchema.methods.hashPassword = function() {
  return this.setPassword(this.password);
};

UserSchema.methods.setPassword = function(password) {
  // generate a salt
  return bcrypt.genSaltAsync(SALT_WORK_FACTOR).then((salt) => {
    // hash the password along with our new salt
    return bcrypt.hashAsync(this.password, salt);
  }).then((hash) => {
    // override the cleartext password with the hashed one
    this.password = hash;
  });
};

UserSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compareAsync(candidatePassword, this.password);
};

let User = mongoose.model('User', UserSchema);
export { User };
