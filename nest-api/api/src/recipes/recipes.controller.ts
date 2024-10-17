import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { RequestWithUser } from 'src/auth/jwt.strategy';
import { CreateRecipeDto } from './dto/create-recipe.dto';

@UseGuards(AuthGuard)
@Controller('/api/v1/recipes')
export class RecipesController {
  constructor(private readonly recipeService: RecipesService) {}
  @Post()
  protected async create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipeService.create(createRecipeDto);
  }

  @Get()
  findAll() {
    return this.recipeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipeService.update(id, updateRecipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipeService.remove(id);
  }

  @Post('/like/:id')
  async addFavoriteRecipe(
    @Param('id') id: string,
    @Req() req: RequestWithUser,
  ): Promise<void> {
    const userId = String(req.user.userId);
    return this.recipeService.addFavoriteRecipe(id, userId);
  }

  @Post('/unlike/:id')
  async removeFavoriteRecipe(
    @Param('id') id: string,
    @Req() req: RequestWithUser,
  ): Promise<void> {
    const userId = String(req.user.userId);
    return this.recipeService.removeFavoriteRecipe(id, userId);
  }
}
