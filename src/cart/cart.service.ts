import { Injectable } from '@nestjs/common';
import { PrismaService } from 'shared/services/prisma.service';
import { Cart, CartItem } from '@prisma/client';

@Injectable()
export class CartService {
  constructor(private prismaService: PrismaService) {}
  public getById(id: Cart['id']): Promise<Cart | null> {
    return this.prismaService.cart.findUnique({
      where: { id },
      include: { products: true },
    });
  }
  public createCart(cartData: Omit<Cart, 'id' | 'totalPrice'>): Promise<Cart> {
    return this.prismaService.cart.create({
      data: cartData,
    });
  }
}
