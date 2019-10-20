import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { GraphQlmoduleModule } from './graph-qlmodule/graph-qlmodule.module';

@Module({
  imports: [UsersModule, GraphQlmoduleModule],
})
export class AppModule {}