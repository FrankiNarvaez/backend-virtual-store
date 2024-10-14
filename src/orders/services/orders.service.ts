import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdersEntity } from '../entities/orders.entity';
import { CreateOrderDTO } from '../dto/create-order.dto';
import { OrderProductsEntity } from '../entities/order-products.entity';
import { ErrorManager } from '../../config/error.manager';
import { ShoppingCartEntity } from '../../shopping-cart/entities/shopping-cart.entity';
import { UsersEntity } from '../../users/entities/users.entity';
import { ProductsEntity } from '../../products/entities/products.entity';
import { ShoppingCartProductsEntity } from '../../shopping-cart/entities/shopping-cart-products.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersEntity)
    private readonly ordersRepository: Repository<OrdersEntity>,
    @InjectRepository(OrderProductsEntity)
    private readonly orderProductsRepository: Repository<OrderProductsEntity>,
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    @InjectRepository(ShoppingCartEntity)
    private readonly shoppingCartRepository: Repository<ShoppingCartEntity>,
    @InjectRepository(ProductsEntity)
    private readonly productsRepository: Repository<ProductsEntity>,
    @InjectRepository(ShoppingCartProductsEntity)
    private readonly shoppingCartProductsRepository: Repository<ShoppingCartProductsEntity>,
  ) {}

  public async createOrder(user_id: string, createOrderDTO: CreateOrderDTO) {
    try {
      // Search user
      const user = await this.usersRepository.findOne({
        where: { id: user_id },
      });
      if (!user) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `User with ID ${user_id} not found`,
        });
      }

      // Create order and assign user
      const order = this.ordersRepository.create({
        total: 0,
        bought_at: new Date(),
        user: user,
        products_includes: [],
      });

      // Save order to get the ID
      await this.ordersRepository.save(order);

      let totalPrice = 0;

      // Associate products with the order
      for (const { product_id, quantity } of createOrderDTO.products) {
        const product = await this.productsRepository.findOne({
          where: { id: product_id },
        });
        if (!product) {
          throw new ErrorManager({
            type: 'NOT_FOUND',
            message: `Product with ID ${product_id} not found`,
          });
        } else if (product.stock < quantity) {
          throw new ErrorManager({
            type: 'BAD_REQUEST',
            message: `Product with ID ${product_id} has insufficient stock`,
          });
        }

        // Create the relation between the product and the order
        const orderProduct = this.orderProductsRepository.create({
          product: product,
          order: order,
          quantity: quantity,
        });

        // Save the product relational with the order
        await this.orderProductsRepository.save(orderProduct);

        // Add the product to the order
        order.products_includes.push(orderProduct);

        // Calculate the total price of the order
        totalPrice += product.price * quantity;

        // Update the stock of the product
        product.stock -= quantity;
        await this.productsRepository.save(product);
      }

      // Update the total price of the order
      order.total = totalPrice;

      // Save the order with the total price
      await this.ordersRepository.save(order);

      // Remove the products from the shopping cart
      const cart = await this.shoppingCartRepository.findOne({
        where: { user: { id: user_id } },
        relations: ['products_includes', 'products_includes.product'],
      });

      if (cart) {
        const productsToRemove = cart.products_includes.filter((cartProduct) =>
          createOrderDTO.products.some(
            (orderProduct) =>
              orderProduct.product_id === cartProduct.product.id,
          ),
        );

        // Remove the products from the shopping cart
        for (const cartProduct of productsToRemove) {
          await this.shoppingCartProductsRepository.delete(cartProduct.id);
        }
      }

      return order;
    } catch (error) {
      throw ErrorManager.createError(error.message);
    }
  }

  async getOrdersByUser(user_id: string): Promise<OrdersEntity[]> {
    return await this.ordersRepository.find({
      where: { user: { id: user_id } },
      relations: ['products_includes', 'products_includes.product'],
    });
  }

  async getAllOrders(): Promise<OrdersEntity[]> {
    return await this.ordersRepository.find({
      relations: ['products_includes', 'products_includes.product', 'user'],
    });
  }

  async getOrderByIdForUser(
    user_id: string,
    order_id: string,
  ): Promise<OrdersEntity> {
    const order = await this.ordersRepository.findOne({
      where: { id: order_id, user: { id: user_id } },
      relations: ['products_includes', 'products_includes.product'],
    });

    if (!order) {
      throw new ErrorManager({
        type: 'NOT_FOUND',
        message: `Order with ID ${order_id} not found`,
      });
    }

    return order;
  }

  async getOrderByIdAsAdmin(order_id: string): Promise<OrdersEntity> {
    const order = await this.ordersRepository.findOne({
      where: { id: order_id },
      relations: ['products_includes', 'products_includes.product', 'user'],
    });

    if (!order) {
      throw new ErrorManager({
        type: 'NOT_FOUND',
        message: `Order with ID ${order_id} not found`,
      });
    }

    return order;
  }

  public async deleteOrder(id: string): Promise<void> {
    try {
      const deleteResult = await this.ordersRepository.delete(id);
      if (deleteResult.affected === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `Order with ID ${id} not found`,
        });
      }
    } catch (error) {
      throw ErrorManager.createError(error.message);
    }
  }
}
