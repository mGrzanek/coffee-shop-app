import { Module } from '@nestjs/common';
import { CartItemsController } from './cart-items.controller';
import { CartItemsService } from './cart-items.service';
import { CartModule } from 'src/cart/cart.module';
import { PrismaService } from 'shared/services/prisma.service';

@Module({
  imports: [CartModule],
  controllers: [CartItemsController],
  providers: [CartItemsService, PrismaService],
})
export class CartItemsModule {}
