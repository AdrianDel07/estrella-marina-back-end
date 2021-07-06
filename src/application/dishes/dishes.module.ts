import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../../infrastructure/config/typeorm/typeorm-config.module';
import { DishesController } from './dishes.controller';
import { DishesService } from './dishes.service';
import { Dish } from '../../core/common/dishes/interface/entity/dishes.entity';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([Dish])],
  controllers: [DishesController],
  providers: [DishesService],
})
export class DishesModule {}
