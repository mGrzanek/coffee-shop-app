import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'shared/services/prisma.service';
import { Order } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}
  public async getOrderById(orderId: Order['id']) {
    return this.prismaService.order.findUnique({
      where: { id: orderId },
    });
  }
  // public async createOrder(
  //   orderData: Omit<
  //     CreateOrderDTO,
  //     'id' | 'createdAt' | 'updatedAt' | 'status'
  //   >,
  // ) {
  //   try {
  //     const newOrder = await this.prismaService.order.create({
  //       data: orderData,
  //     });
  //     return newOrder;
  //   } catch (err) {
  //     console.error('Create order error:', err);
  //     throw err;
  //   }
  // }
}
