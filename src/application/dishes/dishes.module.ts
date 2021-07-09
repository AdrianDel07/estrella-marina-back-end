import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmConfigModule } from '../../infrastructure/config/typeorm/typeorm-config.module';
import { DishesController } from './dishes.controller';
import { DishesService } from './dishes.service';

import { DishRepository } from './dishes.repository';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([DishRepository])],
  controllers: [DishesController],
  providers: [DishesService],
  exports: [DishesService],
})
export class DishesModule {}
