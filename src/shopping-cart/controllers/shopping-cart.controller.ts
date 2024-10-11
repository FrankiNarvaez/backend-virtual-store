import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCartDto } from '../dto/shopping-cart.dto';
import { UpdateShoppingCartDto } from '../dto/update-shopping-cart.dto';

@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @Post('add-product/:user_id')
  public async addProductToCart(
    @Param('user_id') user_id: string,
    @Body() body: ShoppingCartDto,
  ) {
    return this.shoppingCartService.addProdcutToCart(user_id, body);
  }
  @Get(':user_id')
  public async getCart(@Param('user_id') user_id: string) {
    return this.shoppingCartService.getCart(user_id);
  }
  @Delete(':user_id')
  public async deleteCart(
    @Param('user_id') user_id: string,
    @Query('product_id') product_id: string,
  ) {
    return this.shoppingCartService.removeProductFromCart(user_id, product_id);
  }
  @Patch(':user_id')
  public async updateCart(
    @Param('user_id') user_id: string,
    @Query('product_id') product_id: string,
    @Body() body: UpdateShoppingCartDto,
  ) {
    return this.shoppingCartService.updateProductInCart(
      user_id,
      product_id,
      body,
    );
  }
}
