/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class SecureTokenMiddleware implements NestMiddleware {
  X_API_TOKEN = process.env.API_TOKEN;

  use(req: FastifyRequest['raw'], res: FastifyReply['raw'], next: any) {    
    const apiToken = req.headers['x-api-token'];
    if (typeof apiToken != 'undefined' && apiToken == this.X_API_TOKEN) {
      req.headers['token'] = apiToken;
      next();
    } else {
      res.statusCode = 403;
      res.end()
    }
  }
}
