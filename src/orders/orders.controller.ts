import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Body,
  Post,
  Request,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { JwtOptionalAuthGuard } from 'src/auth/jwt-optional-auth.guard';
import { AdminAuthGuard } from 'src/auth/admin-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}
  @Get('/')
  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtOptionalAuthGuard)
  async createOrder(@Body() orderData: CreateOrderDTO, @Request() req) {
    const userId = req.user?.userId || null;
    return this.orderService.createOrder(orderData, userId);
  }
}
