import { Order } from '../../core/common/orders/interface/entity/orders.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {}
