/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import axios from 'axios'

@Injectable()
export class HttpConsumeService {

  // https://developers.mercadolibre.cl/es_ar/items-y-busquedas
  async getItemsFromMELI(query: string): Promise<any> {
    const res = await axios.get('https://api.mercadolibre.com/sites/MLC/search', {
      params: {
        q: query,
      },
    });
    return res
  }

  async getItemFromMELI(id: string): Promise<any> {
    return await axios.get(`https://api.mercadolibre.com/items/${id}`);
  }

  async getItemDescriptionFromMELI(id: string): Promise<any> {
    return await axios.get(`https://api.mercadolibre.com/items/${id}/description`);
  }
}
