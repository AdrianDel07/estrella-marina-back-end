import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DishesModule } from '../dishes/dishes.module';
import ApiServerConfig from '../../infrastructure/config/environment-config/ApiServerConfig';
import * as Joi from 'joi';
import { TypeOrmConfigModule } from '../../infrastructure/config/typeorm/typeorm-config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [ApiServerConfig],
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
    DishesModule,
    TypeOrmConfigModule,
  ],
})
export class AppModule {}
