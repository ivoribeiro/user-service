import { Document } from 'mongoose';

enum Role { Admin, Normal }
enum Gender { Male, Female }

export interface User extends Document {
  name: string;
  email: string;
  username: string;
  password: string;
  gender: Gender;
  birdthday?: Date;
  confirmed: boolean;
  confirmationToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: number;
  role: Role;
}