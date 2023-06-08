/* eslint-disable prettier/prettier */
import { Test } from '@nestjs/testing';
import { ItemService } from './item.service';
import { HttpConsumeService } from './http-consume.service';
import * as responseMELI from '../../test/mock/response-meli.json';
import * as responseMELIItem from '../../test/mock/response-meli-item.json';
import * as responseMELIItemDescription from '../../test/mock/response-meli-item-description.json';
import { HttpStatus } from '@nestjs/common';

describe('ItemService', () => {
  let itemService: ItemService;
  let httpConsumeService: HttpConsumeService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [], // Add
      controllers: [], // Add
      providers: [ItemService, HttpConsumeService], // Add
    }).compile();

    itemService = moduleRef.get<ItemService>(ItemService);
    httpConsumeService = moduleRef.get<HttpConsumeService>(HttpConsumeService);
  });

  it('should be defined', () => {
    expect(itemService).toBeDefined();
  });

  it('should return a valid response from MELI', async () => {
    const axiosResponse: any = {status: 200, data: responseMELI}
    jest.spyOn(httpConsumeService, 'getItemsFromMELI').mockImplementation(async () => axiosResponse);
    const search = 'surface'
    const getItems = await itemService.getItems(search)
    expect(getItems.status).toBe(200);
    expect(getItems.payload.categories).toEqual(['Computación'])
  });

  it('should return a valid response from MELI but no have data', async () => {
    const axiosResponse: any = {status: 200, data: {}}
    jest.spyOn(httpConsumeService, 'getItemsFromMELI').mockImplementation(async () => axiosResponse);
    const search = 'surface'
    const getItems = await itemService.getItems(search)
    expect(getItems.status).toBe(200);
    expect(getItems.payload.categories).toEqual([])
    expect(getItems.payload.items).toEqual([])
  });

  it('should return a invalid response from MELI', async () => {
    const axiosResponse: any = {status: 500, data: {}}
    jest.spyOn(httpConsumeService, 'getItemsFromMELI').mockImplementation(async () => axiosResponse);
    const search = 'surface'
    try {
        await itemService.getItems(search)
    } catch (error) {
        expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR)
    }
  });

  it('should return a valid response from MELI to get item details', async () => {
    const axiosResponseItem: any = {status: 200, data: responseMELIItem}
    const axiosResponseDescription: any = {status: 200, data: responseMELIItemDescription}
    jest.spyOn(httpConsumeService, 'getItemFromMELI').mockImplementation(async () => axiosResponseItem);
    jest.spyOn(httpConsumeService, 'getItemDescriptionFromMELI').mockImplementation(async () => axiosResponseDescription);
    const id = 'MLC1201071875'
    const getItems = await itemService.getItemDescription(id)
    expect(getItems.status).toBe(200);
    expect(getItems.payload.item.id).toEqual(id)
  });

  it('should return a exception when getItem fails', async () => {
    const axiosResponseItem: any = {status: 500, data: {}}
    const axiosResponseDescription: any = {status: 200, data: responseMELIItemDescription}
    jest.spyOn(httpConsumeService, 'getItemFromMELI').mockImplementation(async () => axiosResponseItem);
    jest.spyOn(httpConsumeService, 'getItemDescriptionFromMELI').mockImplementation(async () => axiosResponseDescription);
    const id = 'MLC1201071875'
    try {
        await itemService.getItemDescription(id)
    } catch (error) {
        expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(error.response).toStrictEqual('Fail to get item')
    } 
  });

  it('should return a exception when itemDescription fails', async () => {
    const axiosResponseItem: any = {status: 200, data: responseMELIItem}
    const axiosResponseDescription: any = {status: 500, data: {}}
    jest.spyOn(httpConsumeService, 'getItemFromMELI').mockImplementation(async () => axiosResponseItem);
    jest.spyOn(httpConsumeService, 'getItemDescriptionFromMELI').mockImplementation(async () => axiosResponseDescription);
    const id = 'MLC1201071875'
    try {
        await itemService.getItemDescription(id)
    } catch (error) {
        expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(error.response).toStrictEqual('Fail to get item Details')
    } 
  });
});
