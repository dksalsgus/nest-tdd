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

  async post<T>(
    url: string,
    body: any,
    config: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.httpService.axiosRef.post<T>(url, body, config);
    return response.data;
  }
}
