import { Connection } from 'mongoose';
import { UserSchema } from './schemas/user.schema';

export const usersProviders = [
  {
    provide: 'UserModel',
    useFactory: (connection: Connection) => connection.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];