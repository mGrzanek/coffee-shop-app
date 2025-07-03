import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { WeightService } from './weight.service';

@Controller('weight')
export class WeightController {
  constructor(private weightService: WeightService) {}
  @Get('/')
  async getAllWeights() {
    return this.weightService.getAllWeights();
  }
  @Get('/:id')
  async getWeightById(@Param('id', new ParseUUIDPipe()) id: string) {
    const weight = await this.weightService.getWeightById(id);
    if (!weight) throw new NotFoundException('Weight not found');
  }
}
