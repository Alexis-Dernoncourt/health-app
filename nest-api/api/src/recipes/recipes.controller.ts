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
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RequestWithUser } from 'src/auth/jwt.strategy';
import { CreateRecipeDto } from './dto/createRecipe.dto';
import { UpdateRecipeDto } from './dto/updateRecipe.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { ParseCUIDPipe } from 'src/pipes/cuid-pipe';
import { Public } from 'src/utils';

@ApiBearerAuth()
@Controller('/api/v1/recipes')
export class RecipesController {
  constructor(private readonly recipeService: RecipesService) {}

  @Post()
  @ApiBody({
    description: 'Create recipe body',
    required: true,
    type: CreateRecipeDto,
  })
  // @ApiConsumes('multipart/form-data')
  protected async create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipeService.create(createRecipeDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.recipeService.findAll();
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
  ): Promise<void> {
    const { userId } = req.user;
    return this.recipeService.addFavoriteRecipe(id, userId);
  }

  @Post('/unlike/:id')
  async removeFavoriteRecipe(
    @Param('id', new ParseCUIDPipe()) id: string,
    @Req() req: RequestWithUser,
  ): Promise<void> {
    const { userId } = req.user;
    return this.recipeService.removeFavoriteRecipe(id, userId);
  }
}
