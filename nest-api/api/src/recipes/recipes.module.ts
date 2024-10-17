import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [RecipesService, JwtService, PrismaService],
  imports: [],
  controllers: [RecipesController],
})
export class RecipesModule {}
