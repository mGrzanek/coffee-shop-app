import {
  Controller,
  Param,
  ParseUUIDPipe,
  Body,
  Get,
  Post,
  NotFoundException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}
}
