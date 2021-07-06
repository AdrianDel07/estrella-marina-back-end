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
import { DishesService } from './dishes.service';

@ApiTags('api/v1/dishes')
@Controller('api/v1/')
export class DishesController {
  constructor(private dishesService: DishesService) {}

  @Post('/dishes')
  create(@Body() payload: CreateDishDto) {
    return this.dishesService.create(payload);
  }

  @Get('/dishes')
  @ApiOperation({ summary: 'List of dishes' })
  getDishes(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return this.dishesService.getAll();
  }

  @Get('/dishes/:id')
  getOne(@Param('id') id: number) {
    return this.dishesService.findOne(id);
  }

  @Put('/dishes/:id')
  update(@Param('id') id: number, @Body() payload: UpdateDishDto) {
    return this.dishesService.update(id, payload);
  }

  @Delete('/dishes/:id')
  delete(@Param('id') id: number) {
    return this.dishesService.remove(id);
  }
}
