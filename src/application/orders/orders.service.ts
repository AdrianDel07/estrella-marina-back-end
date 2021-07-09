import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateOrderDto } from '../../core/common/orders/interface/dto/orders.dto';
import { Order } from '../../core/common/orders/interface/entity/orders.entity';
import { ErrorHandler } from '../../infrastructure/handler/ErrorHandler';
import { DishesService } from '../../application/dishes/dishes.service';

// validations
import {
  Weekend,
  Hours,
  ValidateSunday,
} from '../../core/common/validations/Date.validations';
import { OrderRepository } from './orders.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly ordersRepo: OrderRepository,
    private dishesService: DishesService,
  ) {}

  async createOrder(data: CreateOrderDto): Promise<Order> {
    const newData = this.ordersRepo.create(data);

    const now: Date = new Date();
    const weekend = Weekend(new Date(now));
    const hours = Hours(new Date(now));
    const validateSunday = ValidateSunday(new Date(now));

    if (!weekend) {
      ErrorHandler(400, 'solo se permite el servicio los fines de semana');
      return;
    }

    if (weekend && !hours) {
      ErrorHandler(
        400,
        'solo se permite el servicio en horarios de 8A.M a 4P.M',
      );
      return;
    }

    if (data.dish_id) {
      const dish = await this.dishesService.getById(data.dish_id);
      newData.dish = dish;
    }

    if (data.price && validateSunday) {
      newData.price = newData.price * 1.1;
    }

    return this.ordersRepo.save(newData);
  }

  async getOrders(): Promise<Order[]> {
    return this.ordersRepo.find();
  }

  async getOrderById(id: number): Promise<Order> {
    const dish = await this.ordersRepo.findOne(id);
    if (!dish) {
      throw new NotFoundException(`#${id} not found`);
    }
    return dish;
  }

  remove(id: number) {
    return this.ordersRepo.delete(id);
  }
}
