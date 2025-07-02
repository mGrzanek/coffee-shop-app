import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { DelivieriesService } from './delivieries.service';

@Controller('deliveries')
export class DeliveriesController {
  constructor(private deliveriesService: DelivieriesService) {}
  @Get('/')
  async getAllDeliveries() {
    return this.deliveriesService.getAllDeliveries();
  }
  @Get('/:id')
  async getDeliveryById(@Param('id', new ParseUUIDPipe()) deliveryId: string) {
    const delivery = await this.deliveriesService.getDeliveryById(deliveryId);
    if (!delivery) throw new NotFoundException('Delivery not found');
    else return delivery;
  }
}
