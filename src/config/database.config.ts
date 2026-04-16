import { TypeOrmModuleOptions } from '@nestjs/typeorm';

function asBoolean(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined) {
    return fallback;
  }

  return value.toLowerCase() === 'true';
}

export function getDatabaseConfig(): TypeOrmModuleOptions {
  const databaseUrl = process.env.DATABASE_URL;
  const sslSetting = process.env.DB_SSL;
  const ssl =
    sslSetting === undefined
      ? undefined
      : asBoolean(sslSetting, false)
        ? { rejectUnauthorized: false }
        : false;

  return {
    type: 'postgres',
    ...(databaseUrl
      ? {
          url: databaseUrl,
        }
      : {
          host: process.env.DB_HOST ?? 'localhost',
          port: Number(process.env.DB_PORT ?? 5432),
          username: process.env.DB_USERNAME ?? 'postgres',
          password: process.env.DB_PASSWORD ?? 'postgres',
          database: process.env.DB_NAME ?? 'vehicle_booking',
        }),
    autoLoadEntities: true,
    synchronize: asBoolean(process.env.DB_SYNCHRONIZE, true),
    retryAttempts: 5,
    retryDelay: 2000,
    ...(ssl === undefined ? {} : { ssl }),
  };
}
