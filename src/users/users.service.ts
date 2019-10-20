import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/users.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(@Inject('UserModel') private readonly userModel: Model<User>) { }

  async create(createCatDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createCatDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}