import { Injectable } from '@nestjs/common';
import { PrismaService } from 'shared/services/prisma.service';
import { Cart } from '@prisma/client';
import { CreateCartDTO } from './dtos/create-cart.dto';

@Injectable()
export class CartService {
  constructor(private prismaService: PrismaService) {}
  public getAllCart() {
    return this.prismaService.cart.findMany();
  }
  public getCartById(id: Cart['id']): Promise<Cart | null> {
    return this.prismaService.cart.findUnique({
      where: { id },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
  }
  public createCart(cartData: CreateCartDTO): Promise<Cart> {
    return this.prismaService.cart.create({
      data: cartData,
    });
  }
  public updateCart(
    cartId: Cart['id'],
    cartData: Omit<Cart, 'id'>,
  ): Promise<Cart> {
    return this.prismaService.cart.update({
      where: { id: cartId },
      data: cartData,
    });
  }
}
