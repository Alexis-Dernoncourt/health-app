import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  providers: [RecipesService, JwtService, PrismaService],
  imports: [CloudinaryModule],
  controllers: [RecipesController],
})
export class RecipesModule {}
