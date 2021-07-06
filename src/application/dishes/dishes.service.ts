import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateDishDto,
  UpdateDishDto,
} from '../../core/common/dishes/interface/dto/dishes.dto';

import { Dish } from '../../core/common/dishes/interface/entity/dishes.entity';
import { ErrorHandler } from '../../infrastructure/handler/ErrorHandler';

@Injectable()
export class DishesService {
  constructor(
    @InjectRepository(Dish) private readonly dishesRepo: Repository<Dish>,
  ) {}

  create(data: CreateDishDto) {
    const newData = this.dishesRepo.create(data);
    if (!data.price) {
      ErrorHandler(400, 'solo se aceptan numeros');
    }
    return this.dishesRepo.save(newData);
  }

  async update(id: number, changes: UpdateDishDto) {
    const dish = await this.dishesRepo.findOne(id);
    this.dishesRepo.merge(dish, changes);
    return this.dishesRepo.save(dish);
  }

  getAll() {
    return this.dishesRepo.find();
  }

  async findOne(id: number) {
    const dish = await this.dishesRepo.findOne(id);
    if (!dish) {
      throw new NotFoundException(`#${id} not fount`);
    }
    return dish;
  }

  remove(id: number) {
    return this.dishesRepo.delete(id);
  }
}
