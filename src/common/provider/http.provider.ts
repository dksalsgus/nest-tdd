import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class HttpProvider {
  constructor(private readonly httpService: HttpService) {}

  async get(url: string, config: AxiosRequestConfig) {
    const response = await this.httpService.axiosRef.get(url, config);
    return response;
  }

  async post(url: string, body: any, config: AxiosRequestConfig) {
    const response = await this.httpService.axiosRef.post(url, body, config);
    return response;
  }
}
