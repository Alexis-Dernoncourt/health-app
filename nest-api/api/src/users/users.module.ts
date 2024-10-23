import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  controllers: [UsersController],
  imports: [CloudinaryModule],
  providers: [UsersService, JwtService, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
