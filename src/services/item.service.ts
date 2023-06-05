/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
    GetItemDescriptionResponse,
  GetItemsResponse,
  Item,
  ItemPrice,
} from 'src/dto/get-item-response.dto';
import { HttpConsumeService } from './http-consume.service';

@Injectable()
export class ItemService {
  constructor(private httpConsumeMELI: HttpConsumeService) {}

  item: Item;
  itemPrice: ItemPrice;

  async getItems(search: string): Promise<GetItemsResponse> {
    const res = await this.httpConsumeMELI.getItemsFromMELI(search);
    if (res.status === HttpStatus.OK) {
      const result: GetItemsResponse = {
        status: res.status,
        payload: {
          author: {
            name: 'Sebastian',
            lastname: 'Carreno',
          },
          categories: this.getCategories(res.data),
          items: this.getItemList(res.data),
        },
      };
      return result;
    } else {
      throw new HttpException(res.data, res.status);
    }
  }

  async getItemDescription(id: string): Promise<GetItemDescriptionResponse> {

    const itemResponse = await this.httpConsumeMELI.getItemFromMELI(id);
    
    if (itemResponse.status === HttpStatus.OK) {
        const itemDescriptionResponse = await this.httpConsumeMELI.getItemDescriptionFromMELI(id);
        if (itemDescriptionResponse.status === HttpStatus.OK) {
            const itemDescription: GetItemDescriptionResponse = {
                status: HttpStatus.OK,
                payload: {
                    author: {
                        name: 'Sebastian',
                        lastname: 'Carreno',
                      },
                    item: {
                        id: itemResponse.data.id,
                        title: itemResponse.data.title,
                        picture: itemResponse.data.thumbnail,
                        condition: itemResponse.data.condition,
                        free_shipping: itemResponse.data.shipping.free_shipping,
                        description: itemDescriptionResponse.data.plain_text,
                        sold_quantity: itemResponse.data.sold_quantity,
                        price: {
                            amount: itemResponse.data.price,
                            currency: itemResponse.data.currency_id,
                            decimals: 0 // No aplica para chile
                        }
                    }
                }
            }
            return itemDescription;
        } else {
            throw new HttpException(itemDescriptionResponse.data, itemDescriptionResponse.status);
        }
    } else {
      throw new HttpException(itemResponse.data, itemResponse.status);
    }
  }

  private getCategories(data: any): Array<string> {
    const categories: Array<string> = []
    const category = data.filters.filter(filter => filter.id === 'category')
    if (category.length === 1) {
        for (const value of category[0].values) {
            for (const path of value.path_from_root) {
                categories.push(path.name)
            }
        }
    
    }
    return categories;
  }

  private getItemList(data: any): Array<Item> {

    const itemList: Array<Item> = []

    for (const result of data.results) {
        const item: Item = {
            id: result.id,
            title: result.title,
            picture: result.thumbnail,
            condition: result.condition,
            free_shipping: result.shipping.free_shipping,
            price: {
                amount: result.price,
                currency: result.currency_id,
                decimals: 0 // No aplica para chile
            }
        }
        itemList.push(item)
    }

    return itemList;
  }
}
