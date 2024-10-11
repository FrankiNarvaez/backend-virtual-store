import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderProductsEntity } from './order-products.entity';
import { UsersEntity } from '../../users/entities/users.entity';

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
  @OneToMany(() => OrderProductsEntity, (order) => order.order, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  products_includes: OrderProductsEntity[];
  @ManyToOne(() => UsersEntity, (user) => user.orders, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UsersEntity;
}
