/* eslint-disable prettier/prettier */
import { Controller, Get, Headers } from '@nestjs/common';
import { Access } from 'src/dto/access.interface';
import { AccessService } from 'src/services/access.service';

@Controller()
export class AccessController {
  constructor(private readonly accessService: AccessService) {};

  @Get('/access')
  getAccess(@Headers() headers): Access {
    return { token: this.accessService.getAccess(headers['token'])};
  }
}
