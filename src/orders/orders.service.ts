import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'shared/services/prisma.service';
import { Order } from '@prisma/client';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class OrdersService {
  constructor(
    private prismaService: PrismaService,
    private cartService: CartService,
  ) {}
  public async getOrderById(orderId: Order['id']) {
    return this.prismaService.order.findUnique({
      where: { id: orderId },
    });
  }
  public async createOrder(orderData: CreateOrderDTO) {
    try {
      const deliveryPrice = process.env.DELIVERY_COST;
      const cart = await this.cartService.getCartById(orderData.cartId);
      if (!cart) throw new BadRequestException('Cart not exist');
      else {
        if (!cart.active) throw new BadRequestException('Cart not available');
        else {
          const totalPrice = +deliveryPrice + +cart.totalCartPrice;
          await this.cartService.updateCart(orderData.cartId, {
            userId: cart.userId,
            active: false,
            totalCartPrice: cart.totalCartPrice,
          });
          await this.cartService.createCart({});
          const newOrder = await this.prismaService.order.create({
            data: {
              totalPrice,
              userId: orderData.userId,
              cartId: orderData.cartId,
            },
            include: {
              cart: {
                include: {
                  products: {
                    include: {
                      product: true,
                    },
                  },
                },
              },
              user: true,
            },
          });
          return newOrder;
        }
      }
    } catch (err) {
      console.error('ORDER CREATION ERROR:', err);
      throw err;
    }
  }
}
