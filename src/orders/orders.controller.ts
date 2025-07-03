import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Body,
  Post,
  NotFoundException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dtos/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}
  @Get('/')
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }
  @Get('/:orderId')
  async getOrderById(@Param('orderId', new ParseUUIDPipe()) orderId: string) {
    const order = await this.orderService.getOrderById(orderId);
    if (!order) throw new NotFoundException('Order not found');
    else return order;
  }
  @Post('/')
  async createOrder(@Body() orderData: CreateOrderDTO) {
    return this.orderService.createOrder(orderData);
  }
}
