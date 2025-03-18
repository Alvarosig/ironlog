import { ConfigService } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const configService = new ConfigService();

export const pgConfig: PostgresConnectionOptions = {
  url: configService.get<string>('DB_URL'),
  type: 'postgres',
  port: configService.get<number>('DB_PORT'),
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  ssl: {
    rejectUnauthorized: true,
  },
};
