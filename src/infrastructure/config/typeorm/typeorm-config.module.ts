import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import ApiServerConfig from '../environment-config/ApiServerConfig';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (apiServiceConfig: ConfigType<typeof ApiServerConfig>) => {
        const { dbName, user, password, host, port } =
          apiServiceConfig.postgres;
        return {
          type: 'postgres',
          host,
          port,
          username: user,
          password,
          database: dbName,
          synchronize: true,
          autoLoadEntities: true,
        };
      },
      inject: [ApiServerConfig.KEY],
    }),
  ],
  providers: [],
})
export class TypeOrmConfigModule {}
