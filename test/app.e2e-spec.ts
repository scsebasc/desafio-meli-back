import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { AccessService } from '../src/services/access.service';

describe('test e2e access', () => {
  let app: NestFastifyApplication;

  const accessService = { getAccess: () => 'abc' };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AccessService)
      .useValue(accessService)
      .compile();
    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it(`/GET access 200`, () => {
    return app
      .inject({
        method: 'GET',
        url: '/access',
        headers: {
          'x-api-token': '1234',
        },
      })
      .then((result) => {
        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(JSON.stringify({ token: 'abc' }));
      });
  });

  it(`/GET access 403 invalid x-api-token`, () => {
    return app
      .inject({
        method: 'GET',
        url: '/access',
        headers: {
          'x-api-token': '4321',
        },
      })
      .then((result) => {
        expect(result.statusCode).toEqual(403);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
