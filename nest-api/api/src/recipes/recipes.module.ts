import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Recipes } from './entities/recipe.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [RecipesService, JwtService],
  imports: [MikroOrmModule.forFeature([Recipes])],
  controllers: [RecipesController],
})
export class RecipesModule {}
