import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order_productsEntity } from './order_products.entity';

@Entity('orders')
export class OrdersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  total: number;
  @CreateDateColumn({
    type: 'timestamp',
    name: 'bought_at',
  })
  bought_at: Date;
  @OneToMany(() => Order_productsEntity, (order) => order.order)
  products_includes: Order_productsEntity[];
}
