import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductsEntity } from '../../products/entities/products.entity';
import { OrdersEntity } from './orders.entity';

@Entity('order_products')
export class OrderProductsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(() => OrdersEntity, (order) => order.products_includes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  order: OrdersEntity;
  @ManyToOne(() => ProductsEntity, (product) => product.order_includes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  product: ProductsEntity;
}
