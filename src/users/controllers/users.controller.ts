import { Controller, Get, Put, Delete, Post, Body, Param } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDto, UpdateUserDto } from '../dto/users.dto';
import { UsersService } from '../services/users.service';
import { User } from '../interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @MessagePattern({ cmd: 'createUser' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @Post('/confirmation/:confirmationToken')
  async confirm(@Param() params) {
    return this.usersService.confirm(params.confirmationToken);
  }
  @Post('/login')
  async login(@Body() userLogin) {
    return this.usersService.login(userLogin);
  }

  @Post('/check')
  async check(@Body() { token }) {
    return this.usersService.check(token);
  }
}
