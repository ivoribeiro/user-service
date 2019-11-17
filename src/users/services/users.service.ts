import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/users.dto';
import { User } from '../interfaces/user.interface';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

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

  async login({ email, password }) {
    const user: User = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'The user doesnt exists',
      }, 404);
    }
    if (!user.confirmed) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'The user is not confirmed',
      }, 400);
    }
    const passwordMatch = await bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'The password is wrong',
      }, 403);
    }
    // If user is found and password is right create a token
    const token = await jwt.sign(user.toJSON(), 'secret', { expiresIn: '1 day' });
    // check if any user has found with the given email
    return { token };
  }

  async check(token) {
    // check if the token is valid
    return jwt.verify(token, 'secret');
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
