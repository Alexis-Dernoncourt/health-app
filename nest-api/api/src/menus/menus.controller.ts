import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { MenusService } from './menus.service';
import { RequestWithUser } from 'src/auth/jwt.strategy';
import { CreateMenuDto, UpdateMenuDto } from './dto/menu.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ParseCUIDPipe } from 'src/pipes/cuid-pipe';

@ApiBearerAuth()
@Controller('/api/v1/menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Get()
  findAll(@Req() req: RequestWithUser) {
    return this.menusService.findAll(req.user.userId);
  }

  @Get(':recipeId')
  findOne(
    @Req() req: RequestWithUser,
    @Param('recipeId', new ParseCUIDPipe()) recipeId: string,
  ) {
    return this.menusService.findOne(req.user.userId, recipeId);
  }

  @Post()
  create(
    @Res() res: Response,
    @Req() req: RequestWithUser,
    @Body() createMenuDto: CreateMenuDto,
  ) {
    return this.menusService.create(res, req.user.userId, createMenuDto);
  }

  @Patch(':recipeId')
  update(
    @Req() req: RequestWithUser,
    @Body() updateMenuDto: UpdateMenuDto,
    @Param('recipeId', new ParseCUIDPipe()) recipeId: string,
  ) {
    return this.menusService.update(req.user.userId, updateMenuDto, recipeId);
  }

  @Delete(':recipeId')
  delete(
    @Req() req: RequestWithUser,
    @Param('recipeId', new ParseCUIDPipe()) recipeId: string,
  ) {
    return this.menusService.delete(req.user.userId, recipeId);
  }
}
