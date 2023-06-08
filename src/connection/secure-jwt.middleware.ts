/* eslint-disable prettier/prettier */
import { JwtService } from '@nestjs/jwt';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class SecureByJWTMiddleware implements NestMiddleware {
  X_API_TOKEN = process.env.API_TOKEN;
  KEY = process.env.KEY;
  constructor(private readonly jwt: JwtService) {}

  async use(req: FastifyRequest['raw'], res: FastifyReply['raw'], next: any) {
    try {
      const auth = req.headers['x-authorization'];

      const apiToken = req.headers['x-api-token'];

      let tokenValid = false;

      if (typeof apiToken != 'undefined' && apiToken == this.X_API_TOKEN) {
        tokenValid = true;
      }

      if (typeof auth != 'undefined' && tokenValid) {
        await this.jwt.verifyAsync(auth.toString(), {
          secret: this.KEY,
        });
        next();
      } else {
        res.statusCode = 403;
        res.end();
      }
    } catch (error) {
        res.statusCode = 500;
        res.end();
    }
  }
}
