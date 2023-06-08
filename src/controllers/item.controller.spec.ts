/* eslint-disable prettier/prettier */
import { Test } from '@nestjs/testing';
import { ItemController } from './item.controller';
import { ItemService } from '../services/item.service';
import { HttpConsumeService } from '../services/http-consume.service';
import { GetItemDescriptionResponse, GetItemsResponse } from 'src/dto/get-item-response.dto';

describe('ItemController', () => {
  let itemController: ItemController;
  let itemService: ItemService;

  beforeEach(async () => {

    const moduleRef = await Test.createTestingModule({
      controllers: [ItemController],
      providers: [ItemService, HttpConsumeService],
      imports: []
    }).compile();

    itemService = moduleRef.get<ItemService>(ItemService);
    itemController = moduleRef.get<ItemController>(ItemController);
  });

  describe('Test item controller', () => {
    it('should return a status 200 to get item from search', async () => {
      const serviceRes: GetItemsResponse = {
        status: 200,
        payload: {
            author: {
                name: 'test',
                lastname: 'test'
            },
            categories: [],
            items: []
        }
    };
      jest.spyOn(itemService, 'getItems').mockImplementation(async () => serviceRes);
      const query = {
        search: '123'
      } 
      const getStatus = await itemController.getItemsByQuery(query)
      expect(getStatus.status).toBe(200);
    });
  });

  it('should return a status 200 to get item description from id', async () => {
    const serviceRes: GetItemDescriptionResponse = {
      status: 200,
      payload: {
          author: {
              name: 'test',
              lastname: 'test'
          },
          item: {
            id: '123',
            condition: 'new',
            free_shipping: true,
            picture: '',
            title: '',
            description: 'abc',
            sold_quantity: 150,
            price: {
                amount: 100,
                currency: 'clp',
                decimals: 0
            }
          }
      }
  };
    jest.spyOn(itemService, 'getItemDescription').mockImplementation(async () => serviceRes);
    const params = {
      id: '123'
    } 
    const getStatus = await itemController.getItemById(params.id)
    expect(getStatus.status).toBe(200);
  });
});
