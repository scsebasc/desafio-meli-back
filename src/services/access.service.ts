/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccessService {
  KEY = process.env.KEY || 'key_jwt';

  constructor(private readonly jwt: JwtService) {}

  getAccess(reqToken: string): string {
    const token = this.jwt.sign(reqToken, { secret: this.KEY });
    return token;
  }
}
