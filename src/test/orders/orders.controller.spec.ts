import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from '../../application/orders/orders.service';
import { OrdersController } from '../../application/orders/orders.controller';

import { Order } from '../../core/common/orders/interface/entity/orders.entity';
import { plainToClass } from 'class-transformer';

describe('OrderController', () => {
  let module: TestingModule;
  let ordersController: OrdersController;
  let ordersService: OrderService;

  const resultAll: any = ['test'];
  const oneOrder: Order = plainToClass(Order, {
    id: 1,
    amount: 5,
    price: 132000,
    mesa: 4,
  });

  const mockService = {
    getOrders: () => resultAll,
    getOrderById: () => oneOrder,
    createOrder: () => {},
  };

  const orderServiceProvider = {
    provide: OrderService,
    useValue: mockService,
  };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [orderServiceProvider],
    }).compile();

    ordersService = module.get<OrderService>(OrderService);
    ordersController = module.get<OrdersController>(OrdersController);
  });

  describe('getOrders', () => {
    it('should return orders list', async () => {
      jest
        .spyOn(ordersService, 'getOrders')
        .mockImplementation(() => resultAll);

      expect(await ordersController.getOrders()).toBe(resultAll);
    });
  });

  describe('getOrderById', () => {
    it('should return one Item by Id', async () => {
      expect(await ordersController.getOne(oneOrder.id)).toBe(oneOrder);
    });
  });

  describe('defined', () => {
    it('should return one Item by Id', async () => {
      expect(ordersService).toBeDefined();
    });
  });


});
