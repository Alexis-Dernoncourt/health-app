import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RecipesModule } from './recipes/recipes.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UsersModule, RecipesModule],
  controllers: [AppController],
  providers: [AppService, AuthService, JwtService, PrismaService],
})
export class AppModule {}
