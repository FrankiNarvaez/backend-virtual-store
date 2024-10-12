import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { CreateOrderDTO } from '../dto/create-order.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';

@Controller('orders')
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('create/:user_id')
  public async createOrder(
    @Param('user_id') user_id: string,
    @Body() body: CreateOrderDTO,
  ) {
    return this.ordersService.createOrder(user_id, body);
  }

  @Get('get-orders/:user_id')
  public async getOrdersByUser(@Param('user_id') user_id: string) {
    return this.ordersService.getOrdersByUser(user_id);
  }

  @Get('get-orders')
  public async getOrders() {
    return this.ordersService.getAllOrders();
  }

  @Get('get-order/:user_id')
  public async getOrder(
    @Param('user_id') user_id: string,
    @Query('order_id') order_id: string,
  ) {
    return this.ordersService.getOrderByIdForUser(user_id, order_id);
  }

  @Get('get-order')
  public async getOrderById(@Query('order_id') order_id: string) {
    return this.ordersService.getOrderByIdAsAdmin(order_id);
  }

  @Delete(':order_id')
  public async deleteOrder(@Param('order_id') order_id: string) {
    return this.ordersService.deleteOrder(order_id);
  }
}
