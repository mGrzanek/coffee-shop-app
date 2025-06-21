import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'shared/services/prisma.service';
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports: [CartModule],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
