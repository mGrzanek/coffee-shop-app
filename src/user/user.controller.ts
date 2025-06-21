import {
  Controller,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { CartService } from 'src/cart/cart.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private cartService: CartService,
  ) {}
  @Post('/:cartId/user')
  async createUser(
    @Param('cartId', new ParseUUIDPipe()) cartId: string,
    @Body() userData: CreateUserDto,
  ) {
    const cart = await this.cartService.getCartById(cartId);
    if (!cart) throw new NotFoundException('Cart not found');
    else return this.userService.createUser(userData);
  }
  @Put('/:cartId/user/:id')
  async updateUser(
    @Param('cartId', new ParseUUIDPipe()) cartId: string,
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Body() userData: UpdateUserDto,
  ) {
    const cart = await this.cartService.getCartById(cartId);
    if (!cart) throw new NotFoundException('Cart not found');
    return this.userService.updateUser(userId, userData);
  }
}
