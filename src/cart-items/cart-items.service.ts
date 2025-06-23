import { Injectable } from '@nestjs/common';
import { CartItem, Cart } from '@prisma/client';
import { Weight, weightMultiplier } from 'enums/weight.enum';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'shared/services/prisma.service';

type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: { product: true };
}>;

@Injectable()
export class CartItemsService {
  constructor(private prismaService: PrismaService) {}
  public async getAllCartItems(
    cartId: Cart['id'],
  ): Promise<CartItemWithProduct[]> {
    const items = await this.prismaService.cartItem.findMany({
      where: { cartId },
      include: { product: true },
    });

    console.log(JSON.stringify(items, null, 2));
    return items;
  }
  public getCartItemById(
    cartId: Cart['id'],
    id: CartItem['id'],
  ): Promise<CartItem | null> {
    return this.prismaService.cartItem.findFirst({
      where: { id, cartId },
      include: { product: true },
    });
  }
  public async createCartItem(
    cartItemData: Omit<CartItem, 'id'>,
  ): Promise<CartItem> {
    const cartItem = await this.prismaService.cartItem.create({
      data: cartItemData,
    });
    await this.calculateTotalPrice(cartItem.cartId);
    return cartItem;
  }
  public async updateCartItem(
    cartItemId: CartItem['id'],
    cartItemData: Omit<CartItem, 'id'>,
  ): Promise<CartItem> {
    try {
      const updatedCartItem = await this.prismaService.cartItem.update({
        where: { id: cartItemId },
        data: cartItemData,
      });
      await this.calculateTotalPrice(updatedCartItem.cartId);
      return updatedCartItem;
    } catch (err) {
      console.error('updateCartItem error:', err);
      throw err;
    }
  }
  public async removeCartItem(cartId: Cart['id'], cartItemId: CartItem['id']) {
    const cartItem = await this.prismaService.cartItem.delete({
      where: { id: cartItemId },
    });
    await this.calculateTotalPrice(cartId);
    return cartItem;
  }
  public async calculateTotalPrice(cartId: Cart['id']) {
    const cartItems = await this.getAllCartItems(cartId);
    const totalCartPrice = cartItems.reduce((acc, item) => {
      const multiplier = weightMultiplier(item.weight as Weight);
      return acc + item.product.price * item.productAmount * multiplier;
    }, 0);
    return this.prismaService.cart.update({
      where: { id: cartId },
      data: { totalCartPrice },
    });
  }
}
