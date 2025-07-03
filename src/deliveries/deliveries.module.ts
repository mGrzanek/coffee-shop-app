import { Module } from '@nestjs/common';
import { DeliveriesController } from './deliveries.controller';
import { DelivieriesService } from './delivieries.service';
import { PrismaService } from 'shared/services/prisma.service';

@Module({
  controllers: [DeliveriesController],
  providers: [DelivieriesService, PrismaService],
  exports: [DelivieriesService],
})
export class DeliveriesModule {}
