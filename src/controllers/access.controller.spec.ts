/* eslint-disable prettier/prettier */
import { Test } from '@nestjs/testing';
import { AccessController } from './access.controller';
import { AccessService } from '../services/access.service';
import { JwtService } from '@nestjs/jwt';

describe('AccessController', () => {
  let accessController: AccessController;
  let accessService: AccessService;

  beforeEach(async () => {

    const moduleRef = await Test.createTestingModule({
      controllers: [AccessController],
      providers: [AccessService, JwtService],
    }).compile();

    accessService = moduleRef.get<AccessService>(AccessService);
    accessController = moduleRef.get<AccessController>(AccessController);
  });

  describe('Test access controller', () => {
    it('should return a token object', async () => {
      const token = '123';
      jest.spyOn(accessService, 'getAccess').mockImplementation(() => token);
      const headers = {
        token: '123'
      } 
      const getAccess = accessController.getAccess(headers)
      expect(getAccess).toStrictEqual({token: '123'});
    });
  });
});
