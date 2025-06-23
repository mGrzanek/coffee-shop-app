import {
  Controller,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('/')
  async createUser(@Body() userData: CreateUserDto) {
    return this.userService.createUser(userData);
  }
  @Put('/:id')
  async updateUser(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Body() userData: UpdateUserDto,
  ) {
    return this.userService.updateUser(userId, userData);
  }
}
