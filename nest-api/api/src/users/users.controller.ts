import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Req,
  BadRequestException,
  ForbiddenException,
  ParseUUIDPipe,
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';
import { Express } from 'express';
import { UsersService } from './users.service';
import { ImageUploadBody, UpdateUserDto } from './dto/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { RequestWithUser } from 'src/auth/jwt.strategy';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiExcludeEndpoint,
} from '@nestjs/swagger';
import { SigninDto } from 'src/auth/dto/auth-signin.dto';

@ApiBearerAuth()
@Controller('/api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  @ApiExcludeEndpoint(true)
  protected async create(@Body() createUserDto: SigninDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Req() req: RequestWithUser,
  ) {
    if (req.user.userId !== id) {
      throw new ForbiddenException('You can not do this action');
    }
    return this.usersService.findOne(id);
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
  @ApiBody({
    description: 'Image upload body',
    required: true,
    type: ImageUploadBody,
  })
  @ApiConsumes('multipart/form-data')
  @Post('/image')
  uploadImage(
    @Req() req: RequestWithUser,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /\.(jpg|jpeg|png)$/ })],
      }),
    )
    image: Express.Multer.File,
  ) {
    return this.usersService.uploadImage(req.user.userId, image);
  }

  @Delete('/image')
  deleteImage(@Req() req: RequestWithUser) {
    return this.usersService.deleteImage(req.user.userId, 'health-app/users/');
  }

  @Patch(':id')
  @ApiBody({
    description: 'Update user body',
    type: UpdateUserDto,
  })
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: RequestWithUser,
  ) {
    if (req.user.userId !== id) {
      throw new ForbiddenException('You can not do this action');
    }
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Req() req: RequestWithUser,
  ) {
    if (req.user.userId !== id) {
      throw new ForbiddenException('You can not do this action');
    }
    return this.usersService.remove(id);
  }
}
