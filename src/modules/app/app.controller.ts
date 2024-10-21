import { Controller, Get } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('health')
  @ApiOperation({ summary: 'GET APPLICATION HEALTH STATUS' })
  getHealthStatus() {
    return this.appService.getHealth();
  }
}
