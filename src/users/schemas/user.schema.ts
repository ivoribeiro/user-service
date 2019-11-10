import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  confirmationToken: String,
  confirmed: Boolean,
  email: {
    required: true,
    type: String,
    unique: true,
  },
  info: {
    type: Object,
  },
  password: String,
  role: String,
  username: {
    required: true,
    type: String,
    unique: true,
  },
});
