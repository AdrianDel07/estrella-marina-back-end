import { Test, TestingModule } from '@nestjs/testing';

import { OrderService } from '../../application/orders/orders.service';
import { OrdersController } from '../../application/orders/orders.controller';

describe('OrderController', () => {
  let module: TestingModule;
  let ordersService: OrderService;

  const mockService = {
    getOrders: () => {},
    getOrderById: () => {},
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
  });

  describe('service is defined', () => {
    it('should return true', async () => {
      expect(ordersService).toBeDefined();
    });
  });
});
