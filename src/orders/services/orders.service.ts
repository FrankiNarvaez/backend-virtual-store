import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdersEntity } from '../entities/orders.entity';
import { OrderDto } from '../dto/order.dto';
import { OrderProductsEntity } from '../entities/order-products.entity';
import { OrderProductDto } from '../dto/order-product.dto';
import { ProductsEntity } from '../../products/entities/products.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersEntity)
    private readonly ordersRepository: Repository<OrdersEntity>,
    @InjectRepository(OrderProductsEntity)
    private readonly orderProductsRepository: Repository<OrderProductsEntity>,
    @InjectRepository(ProductsEntity)
    private readonly productsRepository: Repository<ProductsEntity>,
  ) {}

  public async createOrder(
    orderDto: OrderDto,
    orderProducts: OrderProductDto[],
  ): Promise<OrdersEntity> {
    try {
      const order = new OrdersEntity();
      order.total = orderDto.total;
      order.bought_at = orderDto.bought_at;

      const savedOrder = await this.ordersRepository.save(order);

      for (const orderProductDto of orderProducts) {
        const product = await this.productsRepository.findOne({
          where: { id: orderProductDto.product_id },
        });
        if (!product) {
          throw new Error(`Producto con ID ${orderProductDto.product_id} no encontrado`);
        }

        const orderProduct = new OrderProductsEntity();
        orderProduct.order = savedOrder;
        orderProduct.product = product;

        await this.orderProductsRepository.save(orderProduct);
      }

      return savedOrder;
    } catch (error) {
      throw new Error(`Error al crear la orden: ${error.message}`);
    }
  }

  public async getOrders(): Promise<OrdersEntity[]> {
    try {
      return await this.ordersRepository.find({ relations: ['products_includes'] });
    } catch (error) {
      throw new Error(`Error al obtener las órdenes: ${error.message}`);
    }
  }

  public async getOrderById(id: string): Promise<OrdersEntity> {
    try {
      const order = await this.ordersRepository.findOne({
        where: { id },
        relations: ['products_includes'],
      });
      if (!order) {
        throw new Error(`Orden con ID ${id} no encontrada`);
      }
      return order;
    } catch (error) {
      throw new Error(`Error al obtener la orden: ${error.message}`);
    }
  }

  public async deleteOrder(id: string): Promise<void> {
    try {
      const deleteResult = await this.ordersRepository.delete(id);
      if (deleteResult.affected === 0) {
        throw new Error(`Orden con ID ${id} no encontrada`);
      }
    } catch (error) {
      throw new Error(`Error al eliminar la orden: ${error.message}`);
    }
  }
}
