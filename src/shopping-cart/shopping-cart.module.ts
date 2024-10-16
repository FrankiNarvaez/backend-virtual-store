import { Module } from '@nestjs/common';
import { ShoppingCartService } from './services/shopping-cart.service';
import { ShoppingCartController } from './controllers/shopping-cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCartEntity } from './entities/shopping-cart.entity';
import { ProductsEntity } from '../products/entities/products.entity';
import { ShoppingCartProductsEntity } from './entities/shopping-cart-products.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ShoppingCartEntity,
      ShoppingCartProductsEntity,
      ProductsEntity,
    ]),
    UsersModule,
  ],
  providers: [ShoppingCartService],
  controllers: [ShoppingCartController],
})
export class ShoppingCartModule {}
