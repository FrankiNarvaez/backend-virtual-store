import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShoppingCartProductsEntity } from './shopping-cart-products.entity';
import { UsersEntity } from '../../users/entities/users.entity';

@Entity('shopping_cart')
export class ShoppingCartEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @OneToOne(() => UsersEntity)
  @JoinColumn()
  user: UsersEntity;
  @OneToMany(
    () => ShoppingCartProductsEntity,
    (product) => product.shopping_cart,
  )
  products_includes: ShoppingCartProductsEntity[];
}
