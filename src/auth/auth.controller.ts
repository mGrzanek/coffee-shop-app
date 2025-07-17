import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  UseGuards,
  Request,
  Response,
  Delete,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { RegisterDTO } from './dtos/register.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UpdateUserDataDto } from './dtos/update-user-data.dto';
import { UpdateUserPassword } from './dtos/update-user-password.dto';
import * as bcrypt from 'bcryptjs';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}
  @Post('/register')
  async register(@Body() userData: RegisterDTO) {
    return await this.authService.register(userData);
  }
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req, @Response() res) {
    const tokens = await this.authService.createSession(req.user);
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('auth', tokens, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
    });
    res.send({
      message: 'success',
    });
  }
  @UseGuards(JwtAuthGuard)
  @Get('/user')
  async getUser(@Request() req) {
    return this.userService.getUserById(req.user.userId);
  }
  @UseGuards(JwtAuthGuard)
  @Put('/user/data')
  async upadateUserData(@Request() req, @Body() userData: UpdateUserDataDto) {
    const userId = req.user?.userId;
    const user = await this.userService.getUserById(userId);
    if (user) {
      const newData = { ...userData, email: req.user?.email };
      return this.userService.updateUserById(userId, newData, undefined);
    } else throw new NotFoundException('User not found');
  }
  @UseGuards(JwtAuthGuard)
  @Put('/user/password')
  async updateUserPassword(
    @Request() req,
    @Body() userPassword: UpdateUserPassword,
  ) {
    const user = await this.userService.getUserById(req.user?.userId);
    if (user) {
      const isCorrectPassword = await this.authService.validateUser(
        user.email,
        userPassword.password,
      );
      if (isCorrectPassword) {
        const hashedNewPassword = await bcrypt.hash(
          userPassword.newPassword,
          10,
        );
        return this.userService.updateUserById(
          user.id,
          undefined,
          hashedNewPassword,
        );
      } else throw new BadRequestException('Invalid data');
    }
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/logout')
  async logout(@Request() req, @Response() res) {
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('auth', {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      expires: new Date(0),
    });
    res.send({
      message: 'success',
    });
  }
}
