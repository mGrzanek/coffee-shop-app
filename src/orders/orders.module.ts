import { Module } from '@nestjs/common';
import { DeliveriesModule } from 'src/deliveries/deliveries.module';
import { WeightModule } from 'src/weight/weight.module';
import { ProductsModule } from 'src/products/products.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    DeliveriesModule,
    WeightModule,
    ProductsModule,
    UserModule,
    PrismaModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
