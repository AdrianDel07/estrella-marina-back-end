import { Dish } from '../../core/common/dishes/interface/entity/dishes.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateDishDto } from '../../core/common/dishes/interface/dto/dishes.dto';

@EntityRepository(Dish)
export class DishRepository extends Repository<Dish> {
  public async createDish(createDishDto: CreateDishDto): Promise<Dish> {
    const { title, description, price, image, group } = createDishDto;

    const dish = new Dish();
    dish.title = title;
    dish.description = description;
    dish.price = price;
    dish.image = image;
    dish.group = group;

    await this.save(dish);
    return dish;
  }
}
