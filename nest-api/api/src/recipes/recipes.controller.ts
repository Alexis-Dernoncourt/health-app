import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RequestWithUser } from 'src/auth/jwt.strategy';
import { CreateRecipeDto, CreateRecipeFormDto } from './dto/createRecipe.dto';
import { UpdateRecipeDto } from './dto/updateRecipe.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { ParseCUIDPipe } from 'src/pipes/cuid-pipe';
import { Public } from 'src/utils';

@ApiBearerAuth()
@Controller('/api/v1/recipes')
export class RecipesController {
  constructor(private readonly recipeService: RecipesService) {}

  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: (_, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
          return cb(
            new BadRequestException('Only image files are allowed!'),
            false,
          );
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  @ApiBody({ type: CreateRecipeFormDto })
  @ApiConsumes('multipart/form-data')
  @Post()
  async create(
    @UploadedFile()
    image: Express.Multer.File,
    @Body()
    recipe: CreateRecipeDto,
    @Req() req: RequestWithUser,
  ) {
    return this.recipeService.create(recipe, image, req.user.userId);
  }

  @Public()
  @Get()
  findAll(
    @Query('numberOfRecipes') numberOfRecipes?: string,
    @Query('currentPage') currentPage?: string,
  ) {
    if (!numberOfRecipes || !currentPage) return this.recipeService.findAll();
    return this.recipeService.findAll(
      parseInt(numberOfRecipes),
      parseInt(currentPage),
    );
  }

  @Get(':id')
  findOne(@Param('id', new ParseCUIDPipe()) id: string) {
    return this.recipeService.findOne(id);
  }

  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: (_, file, cb) => {
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
  @ApiBody({
    description: 'Update recipe body',
    required: true,
    type: UpdateRecipeDto,
  })
  @ApiConsumes('multipart/form-data')
  @Patch(':id')
  update(
    @Param('id', new ParseCUIDPipe()) id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ })],
      }),
    )
    image: Express.Multer.File,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ) {
    return this.recipeService.update(id, image ?? null, updateRecipeDto);
  }

  @Delete('/image/:id')
  async deleteImage(@Param('id', new ParseCUIDPipe()) id: string) {
    return this.recipeService.deleteImage(id, 'health-app/recipes/');
  }

  @Delete(':id')
  remove(@Param('id', new ParseCUIDPipe()) id: string) {
    return this.recipeService.remove(id);
  }

  @Post('/like/:id')
  async addFavoriteRecipe(
    @Param('id', new ParseCUIDPipe()) id: string,
    @Req() req: RequestWithUser,
  ) {
    const { userId } = req.user;
    return this.recipeService.addFavoriteRecipe(id, userId);
  }

  @Post('/unlike/:id')
  async removeFavoriteRecipe(
    @Param('id', new ParseCUIDPipe()) id: string,
    @Req() req: RequestWithUser,
  ) {
    const { userId } = req.user;
    return this.recipeService.removeFavoriteRecipe(id, userId);
  }
}
