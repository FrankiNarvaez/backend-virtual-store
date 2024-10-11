import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ShoppingCartProductsEntity } from '../../shopping-cart/entities/shopping-cart-products.entity';
import { OrderProductsEntity } from '../../orders/entities/order-products.entity';

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
  @OneToMany(() => ShoppingCartProductsEntity, (product) => product.product)
  shopping_cart_includes: ShoppingCartProductsEntity[];
  @OneToMany(() => OrderProductsEntity, (product) => product.product)
  order_includes: OrderProductsEntity[];
}
