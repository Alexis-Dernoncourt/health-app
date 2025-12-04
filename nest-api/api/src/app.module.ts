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
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { MenusModule } from './menus/menus.module';
import { AiService } from './ai-service/ai.service';
import { AiController } from './ai-service/ai.controller';
import { AiModule } from './ai-service/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    RecipesModule,
    MenusModule,
    AiModule,
  ],
  controllers: [AppController, AiController],
  providers: [
    AppService,
    AuthService,
    JwtService,
    PrismaService,
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
    AiService,
  ],
})
export class AppModule {}
