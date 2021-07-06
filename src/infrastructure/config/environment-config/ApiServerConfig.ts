import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },
    postgres: {
      dbName: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      user: process.env.DB_USERNAME,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
    },
  };
});
