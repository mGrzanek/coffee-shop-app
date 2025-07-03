import { Module } from '@nestjs/common';
import { WeightController } from './weight.controller';
import { WeightService } from './weight.service';
import { PrismaService } from 'shared/services/prisma.service';

@Module({
  controllers: [WeightController],
  providers: [WeightService, PrismaService],
  exports: [WeightService],
})
export class WeightModule {}
