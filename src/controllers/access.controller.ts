import { Controller, Get } from '@nestjs/common';
import { AccessService } from 'src/services/access.service';

@Controller()
export class AccessController {
  constructor(private readonly accessService: AccessService) {};

  @Get('/access')
  getAccess(): string {
    return this.accessService.getAccess();
  }
}
