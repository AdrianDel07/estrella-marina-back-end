import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import {
  CreateDishDto,
  UpdateDishDto,
} from '../../core/common/dishes/interface/dto/dishes.dto';

import { Dish } from '../../core/common/dishes/interface/entity/dishes.entity';
import { ErrorHandler } from '../../infrastructure/handler/ErrorHandler';
import { DishRepository } from './dishes.repository';

@Injectable()
export class DishesService {
  dishRespository: Repository<Dish>;
  constructor(private dishesRepo: DishRepository) {}

  async create(data: CreateDishDto): Promise<Dish> {
    const newData = this.dishesRepo.create(data);
    if (!data.price) {
      ErrorHandler(400, 'solo se aceptan numeros');
    }
    return this.dishesRepo.save(newData);
  }

  async update(id: number, changes: UpdateDishDto): Promise<Dish> {
    const dish = await this.dishesRepo.findOne(id);
    this.dishesRepo.merge(dish, changes);
    return this.dishesRepo.save(dish);
  }

  async getAll(): Promise<Dish[]> {
    return this.dishesRepo.find();
  }

  async getById(id: number): Promise<Dish> {
    const dish = await this.dishesRepo.findOne(id);
    if (!dish) {
      throw new NotFoundException(`#${id} not found`);
    }
    return dish;
  }

  public async remove(id: number): Promise<void> {
    await this.dishesRepo.delete(id);
  }
}
