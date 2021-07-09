import { Test, TestingModule } from '@nestjs/testing';

import { DishesService } from '../../application/dishes/dishes.service';
import { DishesController } from '../../application/dishes/dishes.controller';

describe('DishesController', () => {
  let module: TestingModule;
  let dishesService: DishesService;

  const mockService = {
    getAll: () => {},
    getById: () => {},
  };

  const dishServiceProvider = {
    provide: DishesService,
    useValue: mockService,
  };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [DishesController],
      providers: [dishServiceProvider],
    }).compile();

    dishesService = module.get<DishesService>(DishesService);
  });

  describe('service is defined', () => {
    it('should return true', async () => {
      expect(dishesService).toBeDefined();
    });
  });
});
