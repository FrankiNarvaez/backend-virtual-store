import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderProductsEntity } from './order-products.entity';

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
  @OneToMany(() => OrderProductsEntity, (order) => order.order)
  products_includes: OrderProductsEntity[];
}
