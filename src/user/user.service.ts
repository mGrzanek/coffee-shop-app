import { Injectable } from '@nestjs/common';
import { PrismaService } from 'shared/services/prisma.service';
import { User } from '@prisma/client';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private cartService: CartService,
  ) {}
  public getUserById(userId: User['id']) {
    return this.prismaService.user.findUnique({
      where: { id: userId },
    });
  }
  public async createUser(userData: Omit<User, 'id' | 'role'>) {
    try {
      const user = await this.prismaService.user.create({
        data: userData,
      });
      const cart = await this.cartService.getCartById(userData.cartId);
      await this.cartService.updateCart(userData.cartId, {
        userId: user.id,
        totalCartPrice: cart.totalCartPrice,
      });
      return user;
    } catch (err) {
      console.error('User create: ', err);
      return err;
    }
  }
  public updateUser(userId: User['id'], userData: Omit<User, 'id' | 'role'>) {
    return this.prismaService.user.update({
      where: { id: userId },
      data: userData,
    });
  }
  public removeUser(userId: User['id']) {
    return this.prismaService.user.delete({
      where: { id: userId },
    });
  }
}
