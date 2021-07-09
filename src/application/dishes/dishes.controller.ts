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

import {
  CreateDishDto,
  UpdateDishDto,
} from '../../core/common/dishes/interface/dto/dishes.dto';
import { Dish } from '../../core/common/dishes/interface/entity/dishes.entity';
import { DishesService } from './dishes.service';

@ApiTags('api/v1/dishes')
@Controller('api/v1/')
export class DishesController {
  constructor(private dishesService: DishesService) {}

  @Post('/dishes')
  async create(@Body() payload: CreateDishDto): Promise<Dish> {
    return this.dishesService.create(payload);
  }

  @Get('/dishes')
  @ApiOperation({ summary: 'List of dishes' })
  async getDishes(): Promise<Dish[]> {
    return this.dishesService.getAll();
  }

  @Get('/dishes/:id')
  async getOne(@Param('id') id: string): Promise<Dish> {
    return await this.dishesService.getById(+id);
  }

  @Put('/dishes/:id')
  update(@Param('id') id: number, @Body() payload: UpdateDishDto) {
    return this.dishesService.update(id, payload);
  }

  @Delete('/dishes/:id')
  async delete(@Param('id') id: number) {
    return await this.dishesService.remove(id);
  }
}
