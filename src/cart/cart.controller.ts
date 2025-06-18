import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDTO } from './dtos/create-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}
  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const cart = this.cartService.getById(id);
    if (!cart) throw new NotFoundException('Cart not found');
    else return cart;
  }
  @Post('/')
  create(@Body() cartData: CreateCartDTO) {
    return this.cartService.createCart(cartData);
  }
}
