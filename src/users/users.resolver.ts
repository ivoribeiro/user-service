import { Resolver, Query } from '@nestjs/graphql';
import { UsersService } from './services/users.service';

@Resolver()
export class UsersResolver {
    constructor(private readonly usersService: UsersService) { }

    @Query()
    users() {
        return this.usersService.findAll();
    }
}