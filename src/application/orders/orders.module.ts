import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../../infrastructure/config/typeorm/typeorm-config.module';

import { OrdersController } from '../../application/orders/orders.controller';
import { OrderService } from '../../application/orders/orders.service';
import { Order } from '../../core/common/orders/interface/entity/orders.entity';

import { DishesController } from '../../application/dishes/dishes.controller';
import { DishesService } from '../../application/dishes/dishes.service';
import { Dish } from '../../core/common/dishes/interface/entity/dishes.entity';
import { DishesModule } from '../../application/dishes/dishes.module';
import { OrderRepository } from './orders.repository';
import { DishRepository } from '../../application/dishes/dishes.repository';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([OrderRepository, DishRepository]),
    DishesModule,
  ],
  controllers: [OrdersController, DishesController],
  providers: [OrderService, DishesService],
  exports: [OrderService],
})
export class OrdersModule {}
