import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';

export class HttpProvider {
  constructor(private readonly httpService: HttpService) {}

  async get(url: string, config: AxiosRequestConfig) {
    const response = await this.httpService.get(url, config);
    return response;
  }
}
