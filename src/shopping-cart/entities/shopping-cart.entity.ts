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
  @OneToOne(() => UsersEntity, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn()
  user: UsersEntity;
  @OneToMany(
    () => ShoppingCartProductsEntity,
    (product) => product.shopping_cart,
    { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  products_includes: ShoppingCartProductsEntity[];
}
