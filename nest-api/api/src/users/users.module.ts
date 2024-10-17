import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UsersController],
  imports: [],
  providers: [UsersService, JwtService, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
