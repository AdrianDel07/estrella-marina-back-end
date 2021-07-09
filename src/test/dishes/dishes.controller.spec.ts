import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import * as request from 'supertest';

import { DishesService } from '../../application/dishes/dishes.service';
import { DishesController } from '../../application/dishes/dishes.controller';

import { Dish } from '../../core/common/dishes/interface/entity/dishes.entity';
import { DishRepository } from '../../application/dishes/dishes.repository';

import { CreateDishDto } from '../../core/common/dishes/interface/dto/dishes.dto';

describe('DishesController', () => {
  let module: TestingModule;
  let dishesController: DishesController;
  let dishesService: DishesService;
  let dishRepository;

  const mockDishRepository = () => ({
    createProduct: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  });

  const resultAll: any = ['test'];
  const oneDish: Dish = plainToClass(Dish, {
    id: 1,
    title: 'Mojarra Frita',
    description: 'Mojarra Frita',
    price: 25000,
    image:
      'https://pescado.site/wp-content/uploads/2020/11/como-hacer-pescado-frito.jpg',
    group: 1,
  });

  const mockService = {
    getAll: () => resultAll,
    getById: () => oneDish,
    remove: () => {},
  };

  const dishServiceProvider = {
    provide: DishesService,
    useValue: mockService,
  };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [DishesController],
      providers: [
        dishServiceProvider,
        {
          provide: DishRepository,
          useFactory: mockDishRepository,
        },
      ],
    }).compile();

    dishesService = module.get<DishesService>(DishesService);
    dishesController = module.get<DishesController>(DishesController);
    dishRepository = module.get<DishRepository>(DishRepository);
  });

  describe('createProduct', () => {
    it('should save a product in the database', async () => {
      expect(dishRepository.createDish).not.toHaveBeenCalled();
      const createDishDto = {
        title: 'Mojarra Frita',
        description: 'Mojarra Frita',
        price: 55000,
        image:
          'https://pescado.site/wp-content/uploads/2020/11/como-hacer-pescado-frito.jpg',
        group: 1,
      };
      const result = await dishRepository.createDish(createDishDto);
      expect(dishRepository.createDish).toHaveBeenCalledWith(createDishDto);
      expect(result).toEqual('someDish');
    });
  });

  describe('getAll', () => {
    it('should return orders list', async () => {
      jest.spyOn(dishesService, 'getAll').mockImplementation(() => resultAll);

      expect(await dishesController.getDishes()).toBe(resultAll);
    });
  });

  describe('getById', () => {
    it('should return one Item by Id', async () => {
      expect(await dishesController.getOne(oneDish.id)).toBe(oneDish);
    });
  });

  describe('remove', () => {
    it('should delete one Item by Id', async () => {
      dishRepository.delete.mockResolvedValue(1);
      expect(dishRepository.delete).not.toHaveBeenCalled();
      await dishesService.remove(1);
    });
  });
});
