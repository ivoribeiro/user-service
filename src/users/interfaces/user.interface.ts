import { Document } from 'mongoose';

enum Role { Admin, Normal }
enum Gender { Male, Female }

export interface User extends Document {
  email: string;
  username: string;
  password: string;
  confirmationToken: string;
  confirmed: boolean;
  info?: object;
  role?: Role;
}
