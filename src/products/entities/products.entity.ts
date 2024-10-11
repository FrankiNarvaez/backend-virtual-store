import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Shopping_cart_productsEntity } from '../../shopping-cart/entities/shopping_cart_products.entity';
import { Order_productsEntity } from '../../orders/entities/order_products.entity';

@Entity('products')
export class ProductsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  price: number;
  @Column()
  stock: number;
  @Column()
  image: string;
  @OneToMany(() => Shopping_cart_productsEntity, (product) => product.product)
  shopping_cart_includes: Shopping_cart_productsEntity[];
  @OneToMany(() => Order_productsEntity, (product) => product.product)
  order_includes: Order_productsEntity[];
}
