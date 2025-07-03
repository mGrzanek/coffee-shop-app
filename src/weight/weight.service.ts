import { Injectable } from '@nestjs/common';
import { PrismaService } from 'shared/services/prisma.service';
import { Weight } from '@prisma/client';

@Injectable()
export class WeightService {
  constructor(private prismaService: PrismaService) {}
  public getAllWeights(): Promise<Weight[]> {
    return this.prismaService.weight.findMany();
  }
  public getWeightById(weightId: Weight['id']): Promise<Weight | null> {
    return this.prismaService.weight.findUnique({
      where: { id: weightId },
    });
  }
}
