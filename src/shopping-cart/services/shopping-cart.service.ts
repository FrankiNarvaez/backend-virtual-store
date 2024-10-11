import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingCartEntity } from '../entities/shopping-cart.entity';
import { Repository } from 'typeorm';
import { ShoppingCartProductsEntity } from '../entities/shopping-cart-products.entity';
import { ProductsEntity } from '../../products/entities/products.entity';
import { ShoppingCartDto } from '../dto/shopping-cart.dto';
import { ErrorManager } from '../../config/error.manager';
import { UpdateShoppingCartDto } from '../dto/update-shopping-cart.dto';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectRepository(ShoppingCartEntity)
    private readonly shoppingCartRepository: Repository<ShoppingCartEntity>,
    @InjectRepository(ShoppingCartProductsEntity)
    private readonly shoppingCartProductsRepository: Repository<ShoppingCartProductsEntity>,
    @InjectRepository(ProductsEntity)
    private readonly productsRepository: Repository<ProductsEntity>,
  ) {}

  public async addProdcutToCart(user_id: string, body: ShoppingCartDto) {
    try {
      const cart = await this.shoppingCartRepository.findOne({
        where: { user: { id: user_id } },
        relations: ['products_includes', 'products_includes.product'],
      });

      if (!cart) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Cart not found',
        });
      }

      const product = await this.productsRepository.findOne({
        where: { id: body.product_id },
      });

      if (!product) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Product not found',
        });
      }

      const productInCart = cart.products_includes.find(
        (product) => product.product.id === body.product_id,
      );

      if (productInCart) {
        productInCart.quantity += body.quantity;
        await this.shoppingCartProductsRepository.save(productInCart);
      } else {
        const newProduct = this.shoppingCartProductsRepository.create({
          product,
          quantity: body.quantity,
          shopping_cart: cart,
        });
        await this.shoppingCartProductsRepository.save(newProduct);
      }

      return cart;
    } catch (error) {
      throw ErrorManager.createError(error.message);
    }
  }

  public async getCart(user_id: string) {
    try {
      const cart = await this.shoppingCartRepository.findOne({
        where: { user: { id: user_id } },
        relations: ['products_includes', 'products_includes.product'],
      });

      if (!cart) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Cart not found',
        });
      }
      return cart;
    } catch (error) {
      throw ErrorManager.createError(error.message);
    }
  }

  public async removeProductFromCart(user_id: string, product_id: string) {
    try {
      const cart = await this.shoppingCartRepository.findOne({
        where: { user: { id: user_id } },
        relations: ['products_includes', 'products_includes.product'],
      });

      if (!cart) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Cart not found',
        });
      }

      const productInCart = cart.products_includes.find(
        (product) => product.product.id === product_id,
      );

      if (!productInCart) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Product not found in cart',
        });
      }

      return await this.shoppingCartProductsRepository.remove(productInCart);
    } catch (error) {
      throw ErrorManager.createError(error.message);
    }
  }

  public async updateProductInCart(
    user_id: string,
    product_id: string,
    body: UpdateShoppingCartDto,
  ) {
    try {
      const cart = await this.shoppingCartRepository.findOne({
        where: { user: { id: user_id } },
        relations: ['products_includes', 'products_includes.product'],
      });

      if (!cart) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Cart not found',
        });
      }

      const productInCart = cart.products_includes.find(
        (product) => product.product.id === body.product_id,
      );

      if (!productInCart) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Product not found in cart',
        });
      }

      productInCart.quantity = body.quantity;
      return await this.shoppingCartProductsRepository.save(productInCart);
    } catch (error) {
      throw ErrorManager.createError(error.message);
    }
  }
}
