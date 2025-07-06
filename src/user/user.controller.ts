import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('/')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
  @Get('/:id')
  async getUserById(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.userService.getUserById(id);
    if (!user) throw new NotFoundException('User not found');
    else return user;
  }
}
