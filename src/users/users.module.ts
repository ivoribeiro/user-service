import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { usersProviders } from './users.providers';
import { DatabaseModule } from '../database/database.module';
import { UsersResolver } from './users.resolver';

@Module({
    imports: [DatabaseModule],
    exports: [UsersResolver],
    controllers: [UsersController],
    providers: [UsersService, ...usersProviders, UsersResolver],
})
export class UsersModule { }