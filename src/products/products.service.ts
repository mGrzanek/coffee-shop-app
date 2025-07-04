import { Injectable } from '@nestjs/common';
import { PrismaService } from 'shared/services/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}
  public getAll(): Promise<Product[]> {
    return this.prismaService.product.findMany({
      include: { weights: true, images: true },
    });
  }
  public getById(id: Product['id']): Promise<Product | null> {
    return this.prismaService.product.findUnique({
      where: { id },
      include: { weights: true, images: true },
    });
  }
}
