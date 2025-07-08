import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DelivieriesService } from 'src/deliveries/delivieries.service';
import { WeightService } from 'src/weight/weight.service';
import { ProductsService } from 'src/products/products.service';
import { UserService } from 'src/user/user.service';
import { Order, User } from '@prisma/client';
import { CreateOrderDTO } from './dtos/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private prismaService: PrismaService,
    private deliveriesService: DelivieriesService,
    private weightService: WeightService,
    private productsService: ProductsService,
    private userService: UserService,
  ) {}
  public getAllOrders(): Promise<Order[]> {
    return this.prismaService.order.findMany({
      include: { orderedProducts: true, delivery: true },
    });
  }
  public async getOrderById(orderId: Order['id']): Promise<Order | null> {
    return this.prismaService.order.findUnique({
      where: { id: orderId },
      include: { orderedProducts: true, delivery: true },
    });
  }
  public async createOrder(
    orderData: CreateOrderDTO,
    userId: User['id'] | null,
  ): Promise<Order> {
    try {
      const { orderedProducts, deliveryId, ...clientData } = orderData;
      const delivery = await this.deliveriesService.getDeliveryById(deliveryId);
      if (delivery) {
        let totalProductsPrice = 0;
        const validatedOrderedProducts = [];
        for (const item of orderedProducts) {
          const weight = await this.weightService.getWeightById(item.weightId);
          if (weight) {
            const product = await this.productsService.getById(item.productId);
            if (product && product.available) {
              const singlePrice = product.price;
              const totalPrice =
                singlePrice * item.productAmount * weight.multiplier;

              totalProductsPrice += totalPrice;

              validatedOrderedProducts.push({
                productId: product.id,
                productAmount: item.productAmount,
                productSinglePrice: singlePrice,
                productPrice: totalPrice,
                weightId: weight.id,
                optionalMessage: item.optionalMessage || null,
              });
            } else
              throw new BadRequestException(
                `Product ${item.productId} not available`,
              );
          } else
            throw new BadRequestException(
              `Weight ${item.weightId} not available`,
            );
        }
        const finalTotalPrice = totalProductsPrice + delivery.price;
        if (
          finalTotalPrice === clientData.totalPrice &&
          totalProductsPrice === clientData.productsPrice
        ) {
          const orderDataToCreate: any = {
            ...clientData,
            productsPrice: totalProductsPrice,
            totalPrice: finalTotalPrice,
            delivery: {
              connect: { id: deliveryId },
            },
            orderedProducts: {
              create: validatedOrderedProducts,
            },
          };
          if (userId) {
            orderDataToCreate.user = {
              connect: { id: userId },
            };
          }
          return await this.prismaService.order.create({
            data: orderDataToCreate,
            include: {
              orderedProducts: true,
              delivery: true,
            },
          });
        } else throw new ConflictException('Invalid order price');
      } else throw new BadRequestException('Invalid delivery method');
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
