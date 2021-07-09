import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

import { Dish } from '../../../dishes/interface/entity/dishes.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  amount: number;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  mesa: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Dish, (dish) => dish.order, { nullable: true })
  dish: Dish;
}
