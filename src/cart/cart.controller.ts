import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Put,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDTO } from './dtos/create-cart.dto';
import { UpdateCartDto } from './dtos/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}
  @Get('/active')
  async getActiveCart() {
    return this.cartService.getActiveCart();
  }
  @Get('/:id')
  async getCartById(@Param('id', new ParseUUIDPipe()) id: string) {
    const cart = this.cartService.getCartById(id);
    if (!cart) throw new NotFoundException('Cart not found');
    else return cart;
  }
  @Post('/')
  createCart(@Body() cartData: CreateCartDTO) {
    return this.cartService.createCart(cartData);
  }
  @Put('/:id')
  async updateCart(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() cartData: UpdateCartDto,
  ) {
    if (!(await this.cartService.getCartById(id)))
      throw new NotFoundException('Cart not found');
    return this.cartService.updateCart(id, cartData);
  }
}
