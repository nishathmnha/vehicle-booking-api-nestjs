import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class AppController {
  @Get()
  @ApiOkResponse({
    description: 'Basic service metadata.',
  })
  getStatus(): Record<string, string> {
    return {
      name: 'vehicle-booking-api',
      status: 'ok',
      docs: '/api',
    };
  }
}

