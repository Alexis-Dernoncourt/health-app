import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './utils';
import { Response } from 'express';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHome(@Res() response: Response) {
    return response.redirect('/api/v1/');
  }

  @Public()
  @Get('/api/v1/')
  getHello(): string {
    return this.appService.getHello();
  }
}
