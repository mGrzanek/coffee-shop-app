import { Module } from '@nestjs/common';
import { DeliveriesController } from './deliveries.controller';
import { DelivieriesService } from './delivieries.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DeliveriesController],
  providers: [DelivieriesService],
  exports: [DelivieriesService],
})
export class DeliveriesModule {}
