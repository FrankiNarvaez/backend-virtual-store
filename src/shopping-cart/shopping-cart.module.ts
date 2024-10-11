import { Module } from '@nestjs/common';
import { ShoppingCartService } from './services/shopping-cart.service';
import { ShoppingCartController } from './controllers/shopping-cart.controller';

@Module({
  providers: [ShoppingCartService],
  controllers: [ShoppingCartController],
})
export class ShoppingCartModule {}
