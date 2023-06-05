/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class SecureTokenMiddleware implements NestMiddleware {
  X_API_TOKEN = process.env.API_TOKEN;

  use(req: Request, res: Response, next: NextFunction) {
    const apiToken = req.headers['x-api-token'];
    if (typeof apiToken != 'undefined' && apiToken == this.X_API_TOKEN) {
      req.headers['token'] = apiToken;
      next();
    } else {
      res.sendStatus(403);
    }
  }
}
