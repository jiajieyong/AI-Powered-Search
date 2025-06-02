import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('upload')
  uploadFile(): string {
    return this.appService.upload();
  }

  @Get('query')
  query(): string {
    return this.appService.query();
  }
}
