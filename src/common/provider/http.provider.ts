import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

@Injectable()
export class HttpProvider {
  constructor(private readonly httpService: HttpService) {}

  async get<T>(
    url: string,
    config: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    const response = await this.httpService.axiosRef.get<T>(url, config);
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
