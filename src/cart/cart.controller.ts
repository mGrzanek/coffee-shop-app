import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Put,
  ParseUUIDPipe,
  NotFoundException,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDTO } from './dtos/create-cart.dto';
import { CreateCartItemDTO } from './dtos/create-cart-item.dto';
import { UpdateCartDto } from './dtos/update-cart.dto';
import { UpdateCartItemDTO } from './dtos/update-cart-item.dto';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}
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
  @Get('/:cartId/cart-items')
  async getAllCartItems(@Param('cartId', new ParseUUIDPipe()) cartId: string) {
    return this.cartService.getAllCartItems(cartId);
  }
  @Get('/:cartId/cart-items/:itemId')
  async getCartItemById(
    @Param('cartId', new ParseUUIDPipe()) cartId: string,
    @Param('itemId', new ParseUUIDPipe()) itemId: string,
  ) {
    const cartItem = await this.cartService.getCartItemById(cartId, itemId);
    if (!cartItem) throw new NotFoundException('CartItem not found');
    else return cartItem;
  }
  @Post('/:cartId/cart-items')
  async createCartItem(
    @Param('cartId', new ParseUUIDPipe()) cartId: string,
    @Body() cartItemData: CreateCartItemDTO,
  ) {
    return this.cartService.createCartItem({ ...cartItemData, cartId });
  }
  @Put('/:cartId/cart-items/:itemId')
  async updateCartItem(
    @Param('cartId', new ParseUUIDPipe()) cartId: string,
    @Param('itemId', new ParseUUIDPipe()) itemId: string,
    @Body() cartItemDataToUpdate: UpdateCartItemDTO,
  ) {
    return this.cartService.updateCartItem(itemId, {
      ...cartItemDataToUpdate,
      cartId,
    });
  }
  @Delete('/:cartId/cart-items/:itemId')
  async removeCartItem(
    @Param('cartId', new ParseUUIDPipe()) cartId: string,
    @Param('itemId', new ParseUUIDPipe()) itemId: string,
  ) {
    const cartItem = this.cartService.getCartItemById(cartId, itemId);
    if (!cartItem) throw new NotFoundException('CartItem not found');
    else return this.cartService.removeCartItem(cartId, itemId);
  }
}
