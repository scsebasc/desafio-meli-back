import { AccessService } from './services/access.service';
import { AccessController } from './controllers/access.controller';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SecureMiddleware } from './connection/secure.middleware';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AccessController, AppController],
  providers: [AccessService, AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SecureMiddleware).forRoutes('*');
  }
}
