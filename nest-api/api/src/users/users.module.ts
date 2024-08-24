import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Users } from './entities/user.entity';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  imports: [MikroOrmModule.forFeature([Users])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
