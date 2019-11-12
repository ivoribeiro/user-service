import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/users.dto';
import { User } from '../interfaces/user.interface';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(@Inject('UserModel') private readonly userModel: Model<User>) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser: User = new this.userModel(createUserDto);
    createdUser.confirmationToken = crypto.randomBytes(16).toString('hex');
    createdUser.password = await bcrypt.hashSync(createdUser.password, bcrypt.genSaltSync(8), null);
    return createdUser.save();
  }

  async confirm(confirmationToken) {
    const user: User = await this.userModel.findOne({ confirmationToken });
    if (!user) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Confirmation Token not Found',
      }, 404);
    }
    user.confirmed = true;
    user.save();
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
