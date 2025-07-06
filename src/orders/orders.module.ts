import { Module } from '@nestjs/common';
import { DeliveriesModule } from 'src/deliveries/deliveries.module';
import { WeightModule } from 'src/weight/weight.module';
import { ProductsModule } from 'src/products/products.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { PrismaService } from 'shared/services/prisma.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [DeliveriesModule, WeightModule, ProductsModule, UserModule],
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService],
})
export class OrdersModule {}
