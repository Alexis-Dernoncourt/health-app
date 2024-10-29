import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './utils';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('/api/v1/')
  getHello(): string {
    return this.appService.getHello();
  }
}
