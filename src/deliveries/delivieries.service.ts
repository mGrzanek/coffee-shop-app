import { Injectable } from '@nestjs/common';
import { PrismaService } from 'shared/services/prisma.service';
import { Delivery } from '@prisma/client';

@Injectable()
export class DelivieriesService {
  constructor(private prismaService: PrismaService) {}
  public getAllDeliveries() {
    return this.prismaService.delivery.findMany();
  }
  public getDeliveryById(deliveryId: Delivery['id']) {
    return this.prismaService.delivery.findUnique({
      where: { id: deliveryId },
    });
  }
}
