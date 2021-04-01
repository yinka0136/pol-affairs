import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
const dbConfig = config.get('db');
export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  port: dbConfig.port,
  host: dbConfig.host,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  synchronize: dbConfig.synchronize,
  ssl: dbConfig.ssl,
  // logging: true,
  extra: dbConfig.extra,

  entities: [__dirname + '/../**/*.entity.{js,ts}'],
};
