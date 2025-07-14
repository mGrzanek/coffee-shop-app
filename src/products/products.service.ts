import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product, User, Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}
  public getAll(): Promise<Product[]> {
    return this.prismaService.product.findMany({
      include: { weights: true, images: true, users: true },
    });
  }
  public getById(id: Product['id']): Promise<Prisma.ProductGetPayload<{
    include: { users: true; weights: true; images: true };
  }> | null> {
    return this.prismaService.product.findUnique({
      where: { id },
      include: { weights: true, images: true, users: true },
    });
  }
  public async likeProduct(productId: Product['id'], userId: User['id']) {
    try {
      return await this.prismaService.product.update({
        where: { id: productId },
        data: {
          users: {
            connect: { id: userId },
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2025')
        throw new BadRequestException('This product or user not exist.');
      else if (error.code === 'P2002')
        throw new ConflictException('This like already exists.');
      else console.error(error);
    }
  }
  public async unlikeProduct(productId: Product['id'], userId: User['id']) {
    try {
      return await this.prismaService.product.update({
        where: { id: productId },
        data: {
          users: {
            disconnect: { id: userId },
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2025')
        throw new BadRequestException('This product or user not exist.');
      else if (error.code === 'P2002')
        throw new ConflictException('This unlike already exists.');
      else console.error(error);
    }
  }
}
