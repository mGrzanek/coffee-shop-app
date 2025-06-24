import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Body,
  Post,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CartService } from 'src/cart/cart.service';
import { CreateCartItemDTO } from './dtos/create-cart-item.dto';
import { UpdateCartItemDTO } from './dtos/update-cart-item.dto';

@Controller('cart')
export class CartItemsController {
  constructor(
    private cartItemsService: CartItemsService,
    private cartService: CartService,
  ) {}
  @Get('/:cartId/cart-items')
  async getAllCartItems(@Param('cartId', new ParseUUIDPipe()) cartId: string) {
    return this.cartItemsService.getAllCartItems(cartId);
  }
  @Get('/:cartId/cart-items/:itemId')
  async getCartItemById(
    @Param('cartId', new ParseUUIDPipe()) cartId: string,
    @Param('itemId', new ParseUUIDPipe()) itemId: string,
  ) {
    const cartItem = await this.cartItemsService.getCartItemById(
      cartId,
      itemId,
    );
    if (!cartItem) throw new NotFoundException('CartItem not found');
    else return cartItem;
  }
  @Post('/:cartId/cart-items')
  async createCartItem(
    @Param('cartId', new ParseUUIDPipe()) cartId: string,
    @Body() cartItemData: CreateCartItemDTO,
  ) {
    const cart = await this.cartService.getCartById(cartId);
    if (cart)
      return this.cartItemsService.createCartItem({ ...cartItemData, cartId });
    else throw new NotFoundException('Cart not available');
  }
  @Put('/:cartId/cart-items/:itemId')
  async updateCartItem(
    @Param('cartId', new ParseUUIDPipe()) cartId: string,
    @Param('itemId', new ParseUUIDPipe()) itemId: string,
    @Body() cartItemDataToUpdate: UpdateCartItemDTO,
  ) {
    const cart = await this.cartService.getCartById(cartId);
    if (cart)
      return this.cartItemsService.updateCartItem(itemId, {
        ...cartItemDataToUpdate,
        cartId,
      });
    else throw new NotFoundException('Cart not available');
  }
  @Delete('/:cartId/cart-items/:itemId')
  async removeCartItem(
    @Param('cartId', new ParseUUIDPipe()) cartId: string,
    @Param('itemId', new ParseUUIDPipe()) itemId: string,
  ) {
    const cart = await this.cartService.getCartById(cartId);
    if (cart) {
      const cartItem = this.cartItemsService.getCartItemById(cartId, itemId);
      if (!cartItem) throw new NotFoundException('CartItem not found');
      else return this.cartItemsService.removeCartItem(cartId, itemId);
    } else throw new NotFoundException('Cart not available');
  }
  @Delete('/:cartId/cart-items')
  async removeAllCartItems(
    @Param('cartId', new ParseUUIDPipe()) cartId: string,
  ) {
    const cart = await this.cartService.getCartById(cartId);
    if (!cart) throw new NotFoundException('Cart not available');
    else return this.cartItemsService.removeAllCartItems(cartId);
  }
}
