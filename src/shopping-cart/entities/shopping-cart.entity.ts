import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Shopping_cart_productsEntity } from './shopping_cart_products.entity';
import { UsersEntity } from '../../users/entities/users.entity';

@Entity('shopping_cart')
export class ShoppingCartEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @OneToOne(() => UsersEntity)
  @JoinColumn()
  user: UsersEntity;
  @OneToMany(
    () => Shopping_cart_productsEntity,
    (product) => product.shopping_cart,
  )
  products_includes: Shopping_cart_productsEntity[];
}
