import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { UpdateRecipeDto } from './dto/recipe.dto';
import { RequestWithUser } from 'src/auth/jwt.strategy';
import { CreateRecipeDto } from './dto/recipe.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Express } from 'express';

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

  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return cb(
            new BadRequestException('Only image files are allowed!'),
            false,
          );
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024, fields: 0, files: 1 },
    }),
  )
  @Patch(':id')
  update(
    @Param('id') id: string,
    @UploadedFile() image: Express.Multer.File,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ) {
    return this.recipeService.update(id, image ?? null, updateRecipeDto);
  }

  @Delete('/image/:id')
  async deleteImage(@Param('id') id: string) {
    return this.recipeService.deleteImage(id, 'health-app/recipes/');
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
    const { userId } = req.user;
    return this.recipeService.addFavoriteRecipe(id, userId);
  }

  @Post('/unlike/:id')
  async removeFavoriteRecipe(
    @Param('id') id: string,
    @Req() req: RequestWithUser,
  ): Promise<void> {
    const { userId } = req.user;
    return this.recipeService.removeFavoriteRecipe(id, userId);
  }
}
