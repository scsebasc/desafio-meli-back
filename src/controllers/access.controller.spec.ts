import { Test } from '@nestjs/testing';
import { AccessController } from './access.controller';

describe('AccessController', () => {
  let accessController: AccessController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [], // Add
      controllers: [], // Add
      providers: [], // Add
    }).compile();

    accessController = moduleRef.get<AccessController>(AccessController);
  });

  it('should be defined', () => {
    expect(accessController).toBeDefined();
  });
});
