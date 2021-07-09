import { Module, HttpModule  } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import ApiServerConfig from '../../infrastructure/config/environment-config/ApiServerConfig';
import * as Joi from 'joi';
import { TypeOrmConfigModule } from '../../infrastructure/config/typeorm/typeorm-config.module';

import { DishesModule } from '../dishes/dishes.module';
import { OrdersModule } from '../../application/orders/orders.module';

import { OrderService } from '../../application/orders/orders.service';
import { OrdersController } from '../../application/orders/orders.controller';

import { DishesController } from '../../application/dishes/dishes.controller';
import { DishesService } from '../../application/dishes/dishes.service';

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
    OrdersModule,
    HttpModule,
    TypeOrmConfigModule,
  ]
})
export class AppModule {}
