/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccessService {
  KEY = process.env.KEY || 'key_jwt';

  constructor(private readonly jwt: JwtService) {}

  getAccess(reqToken: string): string {
    try {
      if (reqToken.length > 0) {
        return this.jwt.sign(reqToken, { secret: this.KEY });
      } else {
        throw Error('Invalid Token');
      }
    } catch (error) {
      throw new HttpException({message: error.message},HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
