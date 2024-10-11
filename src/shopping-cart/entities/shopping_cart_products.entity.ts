import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ShoppingCartEntity } from './shopping-cart.entity';
import { ProductsEntity } from '../../products/entities/products.entity';

@Entity('shopping_cart_products')
export class Shopping_cart_productsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  quantity: number;
  @ManyToOne(
    () => ShoppingCartEntity,
    (shopping_cart) => shopping_cart.products_includes,
  )
  shopping_cart: ShoppingCartEntity;
  @ManyToOne(() => ProductsEntity, (product) => product.shopping_cart_includes)
  product: ProductsEntity;
}
