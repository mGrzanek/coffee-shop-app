import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'shared/services/prisma.service';
import { Order, Cart, Product, CartItem } from '@prisma/client';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { CartService } from 'src/cart/cart.service';
import { CartItemsService } from 'src/cart-items/cart-items.service';

@Injectable()
export class OrdersService {
  constructor(
    private prismaService: PrismaService,
    private cartService: CartService,
    private cartItemsService: CartItemsService,
  ) {}
  public async getOrderById(orderId: Order['id']) {
    return this.prismaService.order.findUnique({
      where: { id: orderId },
    });
  }
  public async createOrder(orderData: CreateOrderDTO) {
    try {
      const cart = (await this.cartService.getCartById(
        orderData.cartId,
      )) as Cart & {
        products: (CartItem & {
          product: Product | null;
        })[];
      };
      if (!cart) throw new BadRequestException('Cart not available');
      else {
        if (cart.products.length === 0)
          throw new BadRequestException('Cart is empty!');
        else {
          const deliveryPrice = +process.env.DELIVERY_COST;
          const totalPrice = +cart.totalCartPrice + deliveryPrice;
          const userId = cart.userId;
          const orderProducts = cart.products.map((item) => ({
            productId: item.productId,
            name: item.product?.name,
            price: item.product?.price,
            weight: item.weight,
            amount: item.productAmount,
            optionalMessage: item.optionalMessage,
          }));
          const newOrder = await this.prismaService.order.create({
            data: {
              totalPrice,
              userId,
              products: orderProducts,
            },
            include: {
              user: true,
            },
          });
          await this.cartService.updateCart(cart.id, {
            userId: null,
            totalCartPrice: cart.totalCartPrice,
          });
          await this.cartItemsService.removeAllCartItems(cart.id);
          return newOrder;
        }
      }
    } catch (err) {
      console.error('Create order error:', err);
      throw err;
    }
  }
}
