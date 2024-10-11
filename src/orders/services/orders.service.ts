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
  ) {}

  public async createOrder(user_id: string, createOrderDTO: CreateOrderDTO) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: user_id },
      });
      if (!user) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `Usuario con ID ${user_id} no encontrado`,
        });
      }

      const order = this.ordersRepository.create();
      order.total = 0;
      order.bought_at = new Date();
      order.products_includes = [];
      order.user = user;

      let totalPrice = 0;
      for (const { product_id, quantity } of createOrderDTO.products) {
        const product = await this.productsRepository.findOne({
          where: { id: product_id },
        });
        if (!product) {
          throw new ErrorManager({
            type: 'NOT_FOUND',
            message: `Producto con ID ${product_id} no encontrado`,
          });
        }

        const orderProduct = this.orderProductsRepository.create({
          product,
          order,
          quantity,
        });

        order.products_includes.push(orderProduct);
        totalPrice += product.price * quantity;
      }
      order.total = totalPrice;

      await this.ordersRepository.save(order);
      await this.orderProductsRepository.save(order.products_includes);

      const cart = await this.shoppingCartRepository.findOne({
        where: { user: { id: user_id } },
        relations: ['products_includes'],
      });

      cart.products_includes = cart.products_includes.filter(
        (cartProduct) =>
          !createOrderDTO.products.some(
            (orderProduct) =>
              orderProduct.product_id === cartProduct.product.id,
          ),
      );

      await this.shoppingCartRepository.save(cart);
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
      throw new Error('Order not found or not owned by the user');
    }

    return order;
  }

  async getOrderByIdAsAdmin(order_id: string): Promise<OrdersEntity> {
    const order = await this.ordersRepository.findOne({
      where: { id: order_id },
      relations: ['products_includes', 'products_includes.product', 'user'],
    });

    if (!order) {
      throw new Error('Order not found');
    }

    return order;
  }

  public async deleteOrder(id: string): Promise<void> {
    try {
      const deleteResult = await this.ordersRepository.delete(id);
      if (deleteResult.affected === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `Orden con ID ${id} no encontrada`,
        });
      }
    } catch (error) {
      throw ErrorManager.createError(error.message);
    }
  }
}
