/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class SecureByJWTMiddleware implements NestMiddleware {
  X_API_TOKEN = process.env.API_TOKEN;
  KEY = process.env.KEY;

  constructor(private readonly jwt: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const auth = req.headers['x-authorization']? req.headers['x-authorization']: res.status(403);
    const apiToken = req.headers['x-api-token'];

    let tokenValid = false;

    if (typeof apiToken != 'undefined' && apiToken == this.X_API_TOKEN) {
      tokenValid = true;
    }

    if (typeof auth != 'undefined' && tokenValid) {
      try {
        await this.jwt.verifyAsync(auth.toString(), {
          secret: this.KEY
        });
        next();
      } catch (error) {
        res.status(403).send(error);
      }
    } else {
      res.sendStatus(403);
    }
  }
}
