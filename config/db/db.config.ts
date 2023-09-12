import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'tdd-test',
  entities: [],
  synchronize: true,
};
