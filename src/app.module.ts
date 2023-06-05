import { HttpConsumeService } from './services/http-consume.service';
import { ItemService } from './services/item.service';
import { ItemController } from './controllers/item.controller';
import { AccessService } from './services/access.service';
import { AccessController } from './controllers/access.controller';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SecureByJWTMiddleware } from './connection/secure-jwt.middleware';
import { SecureTokenMiddleware } from './connection/secure-token.middleware';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({ secret: process.env.SECRET }),
    HttpModule,
  ],
  controllers: [ItemController, AccessController],
  providers: [HttpConsumeService, ItemService, AccessService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SecureTokenMiddleware).forRoutes('/access');
    consumer.apply(SecureByJWTMiddleware).forRoutes('/api/*');
  }
}
