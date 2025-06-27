import { Controller, Get } from '@nestjs/common';
import { WeightService } from './weight.service';

@Controller('weight')
export class WeightController {
  constructor(private weightService: WeightService) {}
  @Get('/')
  async getAllWeights() {
    return this.weightService.getAllWeights();
  }
}
