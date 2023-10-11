import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class HttpProvider {
  constructor(private readonly httpService: HttpService) {}

  async get(url: string, config: AxiosRequestConfig) {
    const response = await this.httpService.get(url, config);
    return response;
  }
}
