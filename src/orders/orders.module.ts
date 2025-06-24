import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { PrismaService } from 'shared/services/prisma.service';
import { CartModule } from 'src/cart/cart.module';
import { CartItemsModule } from 'src/cart-items/cart-items.module';

@Module({
  imports: [CartModule, CartItemsModule],
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService],
})
export class OrdersModule {}
