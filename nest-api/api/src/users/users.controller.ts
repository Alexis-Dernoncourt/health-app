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
} from '@nestjs/common';
import { Express } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { RequestWithUser } from 'src/auth/jwt.strategy';

@Controller('/api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  protected async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
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
  @Post('/image')
  uploadImage(
    @Req() req: RequestWithUser,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.usersService.uploadImage(req.user.userId, image);
  }

  @Delete('/image')
  deleteImage(@Req() req: RequestWithUser) {
    return this.usersService.deleteImage(req.user.userId, 'health-app/users/');
  }

  @Patch(':id')
  // @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: RequestWithUser,
  ) {
    // console.log('🚀 ~ UsersController ~ file:', file);
    if (req.user.userId !== id) {
      throw new ForbiddenException('You can not do this action');
    }
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    if (req.user.userId !== id) {
      throw new ForbiddenException('You can not do this action');
    }
    return this.usersService.remove(id);
  }
}
