import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from './database/mikro-orm.config';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RecipesModule } from './recipes/recipes.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MikroOrmModule.forRoot(config),
    AuthModule,
    UsersModule,
    RecipesModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, JwtService],
})
export class AppModule {}
