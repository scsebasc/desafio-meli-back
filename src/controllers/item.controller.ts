/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Query } from '@nestjs/common';
import { GetItemsResponse, GetItemDescriptionResponse } from 'src/dto/get-item-response.dto';
import { ItemService } from 'src/services/item.service';

@Controller()
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('/api/items')
  async getItemsByQuery(@Query() query: any): Promise<GetItemsResponse> {
    return await this.itemService.getItems(query.search);
  }

  @Get('/api/items/:id')
  async getItemById(@Param('id') id: string): Promise<GetItemDescriptionResponse> {
    return await this.itemService.getItemDescription(id);
  }
}
