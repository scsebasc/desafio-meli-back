/* eslint-disable prettier/prettier */
import { Test } from '@nestjs/testing';
import { AccessService } from './access.service';
import { JwtService } from '@nestjs/jwt';
import { HttpStatus } from '@nestjs/common';

describe('AccessService', () => {
  let accessService: AccessService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [], // Add
      controllers: [], // Add
      providers: [AccessService, JwtService], // Add
    }).compile();

    accessService = moduleRef.get<AccessService>(AccessService);
  });

  it('should be defined', () => {
    expect(accessService).toBeDefined();
  });

  it('should return a token signed', async () => {
    const getAccess = accessService.getAccess('123')
    expect(getAccess).toStrictEqual('eyJhbGciOiJIUzI1NiJ9.MTIz.OPC_hp_HHVTjyirjrTbPHJ2PXmNIxZeK_OuyWD0bqdg');
  });

  it('should not return a token signed if token is void', async () => {
    try {
        accessService.getAccess('')
    } catch (error) {
        expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(error.response.message).toBe('Invalid Token');
    }
    
  });

  it('should not return a token signed if token is null', async () => {
    try {
        accessService.getAccess(null)
    } catch (error) {
        expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  });
});
