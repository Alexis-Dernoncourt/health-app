import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './utils';

@Controller('/api/v1/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
