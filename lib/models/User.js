import mongoose from 'mongoose';

let UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  name: String,
  admin: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model('User', UserSchema);
