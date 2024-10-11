import { Module } from '@nestjs/common';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersEntity } from './entities/orders.entity';
import { OrderProductsEntity } from './entities/order-products.entity';
import { ProductsEntity } from '../products/entities/products.entity';
import { UsersEntity } from '../users/entities/users.entity';
import { ShoppingCartEntity } from '../shopping-cart/entities/shopping-cart.entity';
import { ShoppingCartProductsEntity } from '../shopping-cart/entities/shopping-cart-products.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrdersEntity,
      OrderProductsEntity,
      ProductsEntity,
      UsersEntity,
      ShoppingCartEntity,
      ShoppingCartProductsEntity,
    ]),
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
