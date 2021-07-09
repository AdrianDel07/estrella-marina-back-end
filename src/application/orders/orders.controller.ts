import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { CreateOrderDto } from '../../core/common/orders/interface/dto/orders.dto';
import { OrderService } from './orders.service';
import { Order } from '../../core/common/orders/interface/entity/orders.entity'

@ApiTags('api/v1/orders')
@Controller('api/v1/')
export class OrdersController {
  constructor(private readonly ordersService: OrderService) {}

  @Post('/orders')
  async create(@Body() payload: CreateOrderDto): Promise<Order> {
    return this.ordersService.createOrder(payload);
  }

  @Get('/orders')
  @ApiOperation({ summary: 'List of orders' })
  getOrders() {
    return this.ordersService.getOrders();
  }

  @Get('/orders/:id')
  async getOne(@Param('id') id: number): Promise<Order> {
    return this.ordersService.getOrderById(id);
  }

  @Delete('/orders/:id')
  delete(@Param('id') id: number) {
    return this.ordersService.remove(id);
  }
}
