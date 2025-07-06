import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Delivery } from '@prisma/client';

@Injectable()
export class DelivieriesService {
  constructor(private prismaService: PrismaService) {}
  public getAllDeliveries(): Promise<Delivery[]> {
    return this.prismaService.delivery.findMany();
  }
  public getDeliveryById(deliveryId: Delivery['id']): Promise<Delivery | null> {
    return this.prismaService.delivery.findUnique({
      where: { id: deliveryId },
    });
  }
}
